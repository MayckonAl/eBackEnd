import { gql } from '@apollo/client'

const GET_CARDS = gql`
  query Get_cards {
    cards {
      data {
        id
        attributes {
          foto {
            data {
              attributes {
                url
              }
            }
          }
          description
          valor
          slug
        }
      }
    }
  }
`
export default GET_CARDS
