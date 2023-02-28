import { useQuery } from '@apollo/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getStorageItem, setStorageItem } from '../../localStorage'

import GET_IDS_CARDS from '../../pages/lib/queries/getIdsCards'

const CART_KEY = 'cartItem'
export const CartContextDefault = {
  items: [],
  addToCart: () => null,
  quantity: 0,
  total: ' 0.00',
  isInCart: () => false,
  removeFromCart: () => null,
  clearCart: () => null,
  loading: false
}
export const CartContext = createContext(CartContextDefault)

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([])

  useEffect(() => {
    const cartLocal = window.localStorage.getItem(CART_KEY)
    if (cartLocal) {
      setCartItem(JSON.parse(cartLocal))
    }
  }, [])

  const { data, loading } = useQuery(GET_IDS_CARDS, {
    skip: !cartItem?.length,
    variables: {
      ids: cartItem
    }
  })

  const itemsCout = cartItem.length

  const saveCart = (cartItem) => {
    setCartItem(cartItem)
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartItem))
  }
  const addToCart = (id) => {
    const itemExiste = cartItem.find((itemId) => itemId === id.id)
    if (!itemExiste) {
      saveCart([...cartItem, id.id])
    }
  }
  const removeFromCart = (id) => {
    const newItems = cartItem.filter((itemId) => itemId !== id)
    saveCart(newItems)
  }
  const clearCart = () => {
    saveCart([])
  }

  const total = data?.cards.data.reduce((acc, item) => {
    return acc + item.attributes.valor
  }, 0)

  const isInCart = (id) => (id ? cartItem.includes(id) : false)

  return (
    <CartContext.Provider
      value={{
        items: data?.cards.data.map((item) => ({
          valor: item.attributes.valor,
          id: item.id,
          desc: item.attributes.description
        })),
        addToCart,
        itemsCout,
        cartItem,
        total: total || 0,
        isInCart,
        removeFromCart,
        clearCart,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
