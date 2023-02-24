import { useQuery } from '@apollo/client'
import { createContext, use, useContext, useEffect, useState } from 'react'
import { getStorageItem } from '../../localStorage'
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
  console.log({ data })
  return (
    <CartContext.Provider
      value={{
        item: data?.cards.data.map((item) => {
          item.attributes.id
          item.attributes.valor
        })
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
