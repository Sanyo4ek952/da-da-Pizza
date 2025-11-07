'use server';
import { CheckoutFormValues } from '@/shared/constants';
import { cookies } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { createPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import { VerificationUserTemplate } from '@/shared/components/shared/email-tamplates/verification-user';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = await cookies();
    const cartToken = cookiesStore.get('cartToken')?.value;
    if (!cartToken) {
      throw new Error('Cart token not found');
    }
    const useCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    if (!useCart) {
      throw new Error('Cart not found');
    }
    if (useCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: useCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(useCart.items),
      },
    });
    await prisma.cart.update({
      where: {
        id: useCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: useCart.id,
      },
    });
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: String(order.id),
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment error');
    }
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });
    const paymentUrl = paymentData.confirmation.confirmation_url;
    await sendEmail(
      data.email,
      'next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );
    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      VerificationUserTemplate({
        code,
      })
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
