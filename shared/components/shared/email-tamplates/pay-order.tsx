interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export function PayOrderTemplate({
  orderId,
  totalAmount,
  paymentUrl,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Заказ, #{orderId}</h1>
      <p>
        Оплатите заказ на сумму {totalAmount} P. Перейдите{' '}
        <a href={paymentUrl}>по этой ссылке</a> для оплаты закза.
      </p>
    </div>
  );
}
