import { useQuery } from '@apollo/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getStorageItem, setStorageItem } from '../../localStorage'

import GET_IDS_CARDS from '../../pages/lib/queries/getIdsCards'

const CART_KEY = 'cartItem'
export const CartContextDefault = {
  items: [],
  addToCart: () => null
}
export const CartContext = createContext(CartContextDefault)

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([])

  useEffect(() => {
    const data = getStorageItem(CART_KEY)
    if (data) {
      setCartItem(data)
    }
  }, [])

  const { data, loading } = useQuery(GET_IDS_CARDS, {
    skip: !cartItem?.length,
    variables: {
      ids: cartItem
    }
  })

  const itemsCout = cartItem.length
  const addToCart = (id) => {
    const newItems = [...cartItem, id]
    setCartItem(newItems)
    setStorageItem(CART_KEY, newItems)
  }
  console.log({ cartItem }, 'cartItem')

  return (
    <CartContext.Provider
      value={{
        items: data?.cards.data.map((item) => ({
          valor: item.attributes.valor,
          ids: item.id,
          desc: item.attributes.description
        })),
        addToCart,
        itemsCout,
        cartItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
