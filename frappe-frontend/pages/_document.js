import NavBar from '@/components/navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <NavBar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
