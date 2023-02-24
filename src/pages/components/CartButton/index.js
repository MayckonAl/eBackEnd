import { useCart } from '../../../hooks/use-cart'

const CartButton = (id) => {
  const { addToCart } = useCart()

  return <button onClick={() => addToCart(id)}>AddTocart</button>
}

export default CartButton
