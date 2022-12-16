import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from '../src/components/layout/main-layout'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* we call our MainLayout component that we build in src/components/layout/main-layout */}
      <MainLayout>
        {/* and pageProps are our children 
        and this header and footer will apply to all every page*/}
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
