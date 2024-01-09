import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/card-count-down.css";
import "../styles/banner-home.css";
import "../styles/advisor.css";
import "../styles/how-buy.css";
import "../styles/tokenomics.css";
import "../styles/meet-our-team.css";

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
      <footer className="footer">
        <div className="container">
          <div className="grid grid-cols-12 footer__top">
            <div className="col-span-4">
              <img src="/logo-text.png" alt="" />
            </div>

            <div className="col-span-8">
              <ul className="footer__menu">
                <li className="footer__item-menu">
                  <a href="#">About</a>
                </li>
                <li className="footer__item-menu">
                  <a href="#">Tokenomics</a>
                </li>
                <li className="footer__item-menu">
                  <a href="#">Team</a>
                </li>
                <li className="footer__item-menu">
                  <a href="#">Roadmap</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-12 footer__copyright">
            <div className="col-span-4">
              <span>2024 @ Studily. All Right Reserved.</span>
            </div>

            <div className="col-span-8">
              <ul className="footer__menu --bottom">
                <li className="footer__item-menu">
                  <a href="#">Pivacy Policy</a>
                </li>
                <li className="footer__item-menu">
                  <a href="#">FAQ’s</a>
                </li>
                <li className="footer__item-menu">
                  <a href="#">Team</a>
                </li>
                <li className="footer__item-menu">
                  <a href="#">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </ThirdwebProvider>
  );
}

export default MyApp;
