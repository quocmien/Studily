const HowBuy = () => {
  return (
    <section className="how-buy">
      <div className="container">
        <div className="how-buy__intro">
          <h3 className="how-buy__title text-center">
            How to buy
          </h3>
          <p className="how-buy__desc text-center">
              When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided. 
          </p>
        </div>

        <div className="how-buy__logo">
          <div className="how-buy__logo-container text-center m-auto">
            <img className="m-auto" width="120px" height="120px" src="/logo-text.png" alt="" />
          </div>
        </div>

        <div className="how-buy__main-container mt-[40px] grid grid-cols-12">
          <div className="col-span-4 how-buy__item-container">
            <div className="how-buy__item">
              <div className="how-buy__icon">
                <img className="m-auto" src="/add-user.png" alt="user" />
              </div>

              <div className="how-buy__intro-item">
                <h4 className="how-buy__title-item text-center">
                  Sign up
                </h4>
                <p className="how-buy__desc-item">
                When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4 how-buy__item-container mt-[172px] ml-[20px]">
            <div className="how-buy__item">
              <div className="how-buy__icon">
                <img className="m-auto" src="/wallet.png" alt="wallet" />
              </div>

              <div className="how-buy__intro-item">
                <h4 className="how-buy__title-item text-center">
                  Connect Wallet
                </h4>
                <p className="how-buy__desc-item">
                When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4 how-buy__item-container">
            <div className="how-buy__item">
              <div className="how-buy__icon">
                <img className="m-auto" src="/buy-token.png" alt="buy token" />
              </div>

              <div className="how-buy__intro-item">
                <h4 className="how-buy__title-item text-center">
                  Buy STY Coin
                </h4>
                <p className="how-buy__desc-item">
                When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowBuy;
