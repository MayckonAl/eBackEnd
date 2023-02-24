import { useQuery } from '@apollo/client'

import GET_CARDS from '../../lib/queries/getCards'
import BACKEND_URL from '../../../pages/helpers'
import CartButton from '../CartButton'
import * as S from './stayled'
import Link from 'next/link'
function Card() {
  const { data, error, loading } = useQuery(GET_CARDS)

  if (loading) return <p>loading...</p>
  if (error || !data) return <p>Error</p>

  return (
    <div>
      {data?.cards.data.map((card) => (
        <S.Wrapper1 key={card.attributes.id}>
          <S.Wrapper2>
            <S.Img src={`${BACKEND_URL + card.foto}`}></S.Img>
            <S.Descricao>
              <p>{card.attributes.description}</p>
              <p>{card.attributes.valor}</p>
            </S.Descricao>
            <p>
              <Link href={`produtos/${card.attributes.slug}`}>Comprar</Link>
            </p>
            <CartButton id={card.id} />
          </S.Wrapper2>
        </S.Wrapper1>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GET_CARDS
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
    revalidate: 60
  }
}
export default Card
