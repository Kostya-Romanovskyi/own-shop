import { IGetUsers } from '../../API/auth/auth.interface';
import CartItem from '../CartItem/CartItem';
import { ICartInfo } from '../../API/cart/cart.interface';

const CartList = ({ userData, cartData }: { userData: IGetUsers; cartData: ICartInfo }) => {
  return (
    <ul className="cart__list">
      {cartData?.result &&
        cartData?.result.map(
          ({ cart_id, quantity, price, unit_price, cart_status, products_item }) => (
            <CartItem
              key={cart_id}
              id={cart_id}
              quantity={quantity}
              price={price}
              unit_price={unit_price}
              cart_status={cart_status}
              products_item={products_item}
              userData={userData}
            />
          )
        )}
    </ul>
  );
};

export default CartList;
