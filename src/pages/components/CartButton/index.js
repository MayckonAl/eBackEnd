import { useCart } from '../../../hooks/use-cart'

const CartButton = (id) => {
  const { addToCart, removeFromCart, isInCart } = useCart()

  return (
    <button onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}>
      AddTocart
    </button>
  )
}

export default CartButton
