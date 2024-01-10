const Tokenomics = () => {
  return (
    <section className="tokenomics">
      <div className="tokenomic__container container">
        <div className="tokenomics__intro">
          <h3 className="tokenomics__title text-center md:text-left">
            Tokenomics
          </h3>
          <p className="tokenomics__desc">
            When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
          </p>
        </div>

        <ul className="tokenomics__list mb-[20px] block md:hidden">
          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#F57C00]"></span>
            <label className="tokenomics__item-label">Seed 3%</label>
          </li>

          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#C2185B]"></span>
            <label className="tokenomics__item-label">Liquidity 5%</label>
          </li>


          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#7B1FA2]"></span>
            <label className="tokenomics__item-label">Staking Reward 5%</label>
          </li>


          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#512DA8]"></span>
            <label className="tokenomics__item-label">Angle 8%</label>
          </li>

          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#1976D2]"></span>
            <label className="tokenomics__item-label">Presell 10%</label>
          </li>


          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#0097A7]"></span>
            <label className="tokenomics__item-label">Private 12%</label>
          </li>

          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#FBC02D]"></span>
            <label className="tokenomics__item-label">Team & Advisor 12%</label>
          </li>


          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#E64A19]"></span>
            <label className="tokenomics__item-label">Eco System & <br />
Marketing Fund 20%</label>
          </li>

          <li className="tokenomics__item-list">
            <span className="tokenomics__item-color bg-[#D32F2F]"></span>
            <label className="tokenomics__item-label">Fund for <br />
Course maker 25%</label>
          </li>
        </ul>

        <div className="tokenomics__content pt-[66.66%]">

        </div>
      </div>
    </section>
  )
}

export default Tokenomics;
