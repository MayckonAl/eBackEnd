import CartButton from '../components/CartButton'
import { BACKEND_URL } from '../helpers'
import { initializeApollo } from '../lib/apollo'
import GET_CARDS from '../lib/queries/getCards'
import GET_CARD_BY_SLUG from '../lib/queries/getCardsBySlug'

const apolloClient = initializeApollo()

export default function index({ card, id }) {
  return (
    <div>
      <div>
        <h1>{card.description}</h1>
        <img src={`${BACKEND_URL + card.foto}`}></img>
        <p>{card.valor}</p>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { data } = await apolloClient.query({
    query: GET_CARD_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  })
  const attr = data.cards.data[0].attributes

  return {
    props: {
      revalidate: 60,
      card: {
        valor: attr.valor,
        description: attr.description,
        foto: attr.foto.data.attributes.url
      }
    }
  }
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query({ query: GET_CARDS })
  const paths = data.cards.data.map((card) => {
    return {
      params: { slug: card.attributes.slug }
    }
  })

  return { paths, fallback: false }
}
