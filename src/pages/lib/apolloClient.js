import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql'
    }),
    cache: new InMemoryCache()
  })
}
export default createApolloClient
