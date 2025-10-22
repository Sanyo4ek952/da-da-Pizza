import { CartItemDTO } from '@/shared/services/dto/cartDTO';

interface EmailTemplateProps {
  orderId: number;
  items: CartItemDTO[];
}

export function OrderSuccessTemplate({ orderId, items }: EmailTemplateProps) {
  return (
    <div>
      <h1>Спасибо за покупку!</h1>
      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} P x{' '}
            {item.quantity} шт {item.productItem.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
