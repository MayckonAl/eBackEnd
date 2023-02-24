import React from 'react'
import { useCart } from '../../../hooks/use-cart'

const DropDown = () => {
  const { items } = useCart()
  console.log(items)
  return (
    <div>
      <h1>DropDown</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <p>{item.valor}</p>
        </div>
      ))}
    </div>
  )
}

export default DropDown
