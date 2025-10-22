import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { PaymentCallbackData } from '@/@types/yookassa';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cartDTO';
import { sendEmail } from '@/shared/lib';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-tamplates/order-success';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;
    console.log('[CALLBACK BODY]', JSON.stringify(body, null, 2));
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });
    const items = JSON.parse(order.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email as string,
        'Da da Pizza / Ваш заказ оформлен',
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      //Письмо о неуспешной оплате
    }
  } catch (error) {
    console.log('[CHECKOUT_CALLBACK_ERROR] Server error', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
