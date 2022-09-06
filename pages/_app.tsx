import '../styles/globals.css'
import type { AppProps } from 'next/app'
//https://crodsimple.vercel.app/

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
