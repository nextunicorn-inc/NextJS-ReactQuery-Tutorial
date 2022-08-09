import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'
import '../styles/global.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    )
}

export default MyApp;
