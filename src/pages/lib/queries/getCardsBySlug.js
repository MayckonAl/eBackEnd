import { gql } from '@apollo/client'

const GET_CARD_BY_SLUG = gql`
  query GET_CARD_SLUG($slug: String) {
    cards(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          slug
          description
          valor
          foto {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`

export default GET_CARD_BY_SLUG
