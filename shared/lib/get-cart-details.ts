import { CartDTO } from '@/shared/services/dto/cartDTO';
import { calcCartItemTotalPrice } from '@/shared/lib/calc-cart-item-total-price';

export interface CartStateItems {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients?: Array<{ name: string; price: number }>;
}
interface ReturnProps {
  items: CartStateItems[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    disabled: false,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItems[];
  return {
    totalAmount: data.totalAmount,
    items,
  };
};
