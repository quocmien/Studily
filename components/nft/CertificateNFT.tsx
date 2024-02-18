interface IProps {
  image: String,
  title: String,
  id: String,
  parentClass: String,
  onResign: Function
}

const CertificateNFT = ({ title, image, id, parentClass, onResign}: IProps) => {
  const onClickResign = () => {
    onResign(id)
  }
  return (
    <div className={`card certificate-nft ${parentClass} rounded-[20px] p-[10px] md:p-[20px]`}>
      <div className="certificate-nft__container">
        <div className="certificate-nft__background rounded-[16px] overflow-hidden w-full --background pt-[100%]" 
          style={
            {
              backgroundImage: `url(${image})`
            }
          }
        />

        <div className="certificate-nft__footer pt-[12px] md:pt-[22px] flex items-center justify-between">
          <div className="certificate-nft__title">
            { title }
          </div>

          <div className="certificate-nft__resign">
            <button
              onClick={onClickResign}
              className="button border outline border-primary outline-[1px] outline-primary rounded-[8px] color-primary
              certificate-nft__btn-resign"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateNFT;
