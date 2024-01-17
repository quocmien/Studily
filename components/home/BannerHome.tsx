import CardCountDown from "./CardCountDown";
import { useRef } from 'react';

const BannerHome = () => {
  const HomeSection = useRef(null);

  return (
    <div ref={HomeSection} className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="banner__intro">
            <div className="banner__intro-contain">
              <h3 className="banner__title">
                Buy <strong className="color-primary">STY</strong> now to <br />
                Get rich in the future
              </h3>
              <p className="banner__desc">
                STY is more than just a DeFi Token. It’s the best DeFi Token and you can learn here 
                about Crypto.
              </p>

              <button className="bg-primary banner__btn-white-paper rounded-[8px] text-white">
                White Paper
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <CardCountDown />
        </div>
      </div>
    </div>
  )
}

export default BannerHome;
