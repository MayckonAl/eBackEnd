import Link from 'next/link'
import { useContext } from 'react'
import { CartContext, useCart } from '../../../hooks/use-cart'
import DropDown from '../DropDown/DropDown'
import * as S from './styled'

export default function Header() {
  const { itemsCout } = useContext(CartContext)

  return (
    <S.WrapparHeader>
      <S.WrapperLogo>
        <S.LogoTitulo>feshion</S.LogoTitulo>
      </S.WrapperLogo>
      <S.WrapperLi>
        <S.Ul>
          <S.Li>contato</S.Li>
          <S.Li>Home</S.Li>
          <S.Li>Sobre</S.Li>
          <S.Li>({itemsCout > 0 && <span>({itemsCout})</span>})</S.Li>
          <DropDown />
        </S.Ul>
      </S.WrapperLi>
    </S.WrapparHeader>
  )
}
