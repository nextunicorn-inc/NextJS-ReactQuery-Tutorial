import type {AppProps} from 'next/app';
import '../styles/global.css';
import {QueryClient, QueryClientProvider} from 'react-query';

export const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;
