import { gql } from '@apollo/client'

const GET_IDS_CARDS = gql`
  query get_idCard($ids: IDFilterInput) {
    cards(filters: { id: $ids }) {
      data {
        id
        attributes {
          valor
          description
        }
      }
    }
  }
`
export default GET_IDS_CARDS
