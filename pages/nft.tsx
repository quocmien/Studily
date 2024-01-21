import CardNFT from "../components/nft/CardNFT";
import SupportWallet from "../components/nft/SupportWallet";
import ExploreNFTs from "../components/nft/ExploreNFTs";
import TopCreator from "../components/nft/TopCreator";
import JoinOur from '../components/home/JoinOur'

const PageNFT = () => {
  return (
    <div className="page-nft">
      <div className="container">
        <div className="page-nft__intro">
          <h2 className="page-nft__title --title-page text-center">
            Explore & Create <br/>
            Your NFT’s on <strong className="color-primary">Studily</strong>
          </h2>
          <p className="page-nft__desc --desc text-center mt-[20px]">
            STY is the best DeFi Token and you can learn here about Crypto.
          </p>
        </div>

        <section className="page-nft__register md:pt-[60px] text-center">
          <div className="page-nft__register-container pt-[60px] 
            flex items-center w-full
            md:gap-[91px] w-full relative justify-center gap-[15px] flex-wrap"
          >
            <CardNFT parentClass="page-nft__item-register" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
            <CardNFT parentClass="page-nft__item-register md:absolute md:top-0" title={"Certificate of Excellence"} image={'/bg-eth-2.png'}/>
            <CardNFT parentClass="page-nft__item-register md:mt-[60px]" title={"Certificate of Excellence"} image={'/bg-eth-3.png'}/>

          </div>

          <button className="btn btn-primary page-nft__btn-register m-auto mt-[60px]">
            Register
          </button>
        </section>


        <SupportWallet />

        <ExploreNFTs />

        <TopCreator />

        <JoinOur />
      </div>
    </div>
  )
}

export default PageNFT;
