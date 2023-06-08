import { AuthContextProvider } from '../stores/authContext'
import '../styles/root.css'

export default function App({
  Component,
  pageProps,
}) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AuthContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthContextProvider>
  )
}
