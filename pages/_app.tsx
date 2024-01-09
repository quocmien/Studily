import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/card-count-down.css";
import "../styles/banner-home.css";

import { AppProps } from "next/app";
import { NextComponentType } from "next";
import HeaderHome from '../components/header/HeaderHome'

// This is the chain your dApp will work on.
const activeChain = "binance-testnet";
const API_KEY = process.env.NEXT_THIRD_WEB_KEY
function MyApp({ Component, pageProps }: any) {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={API_KEY}>
      <HeaderHome />

      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
