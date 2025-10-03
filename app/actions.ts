'use server';
import { CheckoutFormValues } from '@/shared/constants';
import { cookies } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components';

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
    //TODO Сделать создание ссылки оплаты
    await sendEmail(
      data.email,
      'next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: 'https://redux.js.org/tutorials/',
      })
    );
    return 'https://redux.js.org/tutorials/';
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}
