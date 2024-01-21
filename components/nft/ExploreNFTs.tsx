import CardNFT from "../../components/nft/CardNFT";

const ExploreNFTs = () => {
  const Categories = [
    {
      id: 'developer',
      label: 'Developer'
    },
    {
      id: 'engineer',
      label: 'Engineer'
    },
    {
      id: 'lawyer',
      label: 'Lawyer'
    },
    {
      id: 'designer',
      label: 'Designer'
    },
    {
      id: 'doctor',
      label: 'Doctor'
    }
  ]
  const categoryActive = 'developer'
  return (
    <section className="explore-nfts md:pt-[82px] pt-[40px]">
      <div className="explore-nfts__intro text-center">
        <h3 className="explore-nfts__title --title">
          Explore All NFTs
        </h3>
        <p className="--desc explore-nfts__desc mt-[12px]">
          Explore our newly released NFT collection
        </p>
      </div>
      <div className="explore-nfts__container pt-[30px] md:pt-[60px]">
        <ul className="explore-nfts__categories-nft list flex gap-[10px] flex-wrap">
          {
            Categories.map(category => {
              return (
                <li
                  key={category.id}
                  id={category.id}
                  className={`explore-nfts__item-category flex-1 text-center ${categoryActive === category.id ? '--active' : ''}`}
                >
                  <button className="button m-auto explore-nfts__btn-category border border-primary inline-block">
                    {category.label}
                  </button>
                </li>
              )
            })
          }
        </ul>

        <div className="explore-nfts__list-nft grid grid-cols-12 pt-[60px] gap-[20px]">
          <div className="col-span-6 md:col-span-4">
           <CardNFT parentClass="explore-nfts__item-nft" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
          </div>
          <div className="col-span-6 md:col-span-4">
           <CardNFT parentClass="explore-nfts__item-nft" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
          </div>
          <div className="col-span-6 md:col-span-4">
           <CardNFT parentClass="explore-nfts__item-nft" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
          </div>
          <div className="col-span-6 md:col-span-4">
           <CardNFT parentClass="explore-nfts__item-nft" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
          </div>
          <div className="col-span-6 md:col-span-4">
           <CardNFT parentClass="explore-nfts__item-nft" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
          </div>
          <div className="col-span-6 md:col-span-4">
           <CardNFT parentClass="explore-nfts__item-nft" title={"Certificate of Excellence"} image={'/bg-eth.png'}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreNFTs;
