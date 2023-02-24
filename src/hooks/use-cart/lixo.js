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
    console.log('effect')
  }, [])

  const { data, loading } = useQuery(GET_IDS_CARDS, {
    skip: !cartItem?.length,
    variables: {
      filters: {
        id: cartItem
      }
    }
  })

  const itemsCout = cartItem.length

  const addToCart = (id) => {
    const itemExiste = cartItem.find((itemId) => itemId === id)
    if (!itemExiste) {
      const newItems = [...cartItem, id]
      setCartItem(newItems)
    }
  }
  console.log({ cartItem })

  const IsinCart = (id) => (id ? cartItem.includes(id) : false)

  return (
    <CartContext.Provider
      value={{
        items: data?.cards.data.map((item) => ({
          valor: item.attributes.valor,
          id: item.attributes.id,
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
