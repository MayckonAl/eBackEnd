import { useQuery } from '@apollo/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getStorageItem, setStorageItem } from '../../localStorage'
import { GET_CARDS_ID } from '../../pages/lib/queries/getCardsBySlug'
const CART_KEY = 'cartItem'
export const CartContext = createContext([])

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([])

  useEffect(() => {
    const data = getStorageItem(CART_KEY)

    if (data) {
      setCartItem(data)
    }
  }, [])

  const { data } = useQuery(GET_CARDS_ID, {
    skip: !cartItem.length,
    variables: {
      where: {
        id: cartItem
      }
    }
  })
  const total = data?.cards.reduce((acc, cards) => {
    return (acc += cards.attributes.valor || 0)
  }, 0)
  const isInCart = (id) => cartItem.includes(id)

  const addToCart = (id) => {
    setCartItem([...cartItem, id])
    setStorageItem(CART_KEY, cartItem)
  }

  console.log({ addToCart })
  return (
    <CartContext.Provider
      value={{
        item: data?.cards.map((item) => {
          item.attributes.id
          item.attributes.valor
          cartItem.length
          total
          isInCart
          addToCart
        })
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
