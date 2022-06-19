import Button from '@material-ui/core/Button';
import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import React from 'react';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  purchase: (items: CartItemType[]) => void;
  purchaseSuccess: boolean;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, purchase, purchaseSuccess}) => {

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}

        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
  <Button disabled={cartItems.length == 0 || purchaseSuccess} variant="contained" onClick={() => purchase(cartItems)} data-cy={`make-purchase`}>Purchase</Button>
   {purchaseSuccess ? <p>Thank you for your purchase!</p> : null} 
    </Wrapper>
  );
};

export default Cart;
