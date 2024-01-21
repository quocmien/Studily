import { url } from "inspector"

interface IProps {
  title: String,
  image: String,
  parentClass: String ,
}
const CardNFT = ({title, image, parentClass }: IProps) => {
  return (
    <div className={`card card-nft ${parentClass}`}>
      <div
        className="card__background --background"
        style={{
          backgroundImage: `url(${image})`
        }}
      />
      <div className="card-nft__intro">
        <h3 className="card-nft__title text-white text-center mt-[20px]">
          {title}
        </h3>
      </div>
    </div>
  )
}

export default CardNFT;