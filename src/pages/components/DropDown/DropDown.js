import React from 'react'
import { useCart } from '../../../hooks/use-cart'

const DropDown = () => {
  const { items, removeFromCart, clearCart } = useCart()
  console.log(items)
  return (
    <div>
      <h1>DropDown</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <p>{item.valor}</p>
          <button onClick={() => removeFromCart(item.id)}>Lixo</button>
          <div>
            <button onClick={() => clearCart()}>Limpar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DropDown
