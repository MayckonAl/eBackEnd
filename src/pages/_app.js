import { ApolloProvider } from '@apollo/client'
import { CartProvider } from '../hooks/use-cart'
import DropDown from './components/DropDown/DropDown'

import Header from './components/header/Header'
import { useApollo } from './lib/apollo'
import GlobalStyles from './styles/global'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <>
      <title>React</title>
      <ApolloProvider client={apolloClient}>
        <CartProvider>
          <Header />

          <Component {...pageProps} />
        </CartProvider>
      </ApolloProvider>
      <GlobalStyles />
    </>
  )
}

export default MyApp
