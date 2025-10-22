import { axiosInstance } from '@/shared/services/instance';
import { PaymentData } from '@/@types/yookassa';

interface Props {
  description: string;
  amount: number;
  orderId: string;
}

export async function createPayment({ description, orderId, amount }: Props) {
  const { data } = await axiosInstance.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: amount,
        currency: 'RUB',
      },
      capture: true,
      description: description,
      metadata: {
        order_id: orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL as string,
      },
    },
    {
      auth: {
        password: process.env.YOOKASSA_API_KEY as string,
        username: process.env.YOOKASSA_STORE_ID as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    }
  );
  return data;
}
