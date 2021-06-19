import { AppProps } from 'next/app';
import Head from 'next/head';

import './styles.css';
import { AuthProvider } from '../hooks/useAuth';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Autenticação em Next.js</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
