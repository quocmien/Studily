import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { NextComponentType } from "next";

// This is the chain your dApp will work on.
const activeChain = "binance-testnet";
const API_KEY = process.env.NEXT_THIRD_WEB_KEY
function MyApp({ Component, pageProps }: any) {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={API_KEY}>
      <Head>
        <title>Study coin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="test"
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
