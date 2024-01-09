const CardCountDown = () => {
  return (
    <div className="card card-count-down shadow p-[15px] md:p-[32px] rounded-[20px] w-full mt-[25px] md:mt-0">
      <div className="card__header">
        <h3 className="font-bold card__title-header">
          Studily Token is on presale
        </h3>
        <p>
          Studily token ends in January 30, 2024
        </p>
      </div>

      <div className="card__count-down flex">
        <div className="card__item-count-down">
          <p className="card__time">
            20
          </p>
          <span className="card__text-time">
            Days
          </span>
        </div>
        <div className="card__item-count-down">
          <p className="card__time">
            20
          </p>
          <span className="card__text-time">
            Hours
          </span>
        </div>
        <div className="card__item-count-down">
         <p className="card__time">
            20
          </p>
          <span className="card__text-time">
            Minutes
          </span>
        </div>
        <div className="card__item-count-down">
         <p className="card__time">
            20
          </p>
          <span className="card__text-time">
            Seconds
          </span>
        </div>
      </div>

      <div className="card__progress">
        <div className="card__progress-title">
          <span>Current Progress</span>
        </div>
      </div>

      <div className="card__token-info">
        <div className="card__item-token-info">
          <span className="card__token-label">
            Token name:
          </span>
          <span>
            Studily (STY)
          </span>
        </div>
        <div className="card__item-token-info">
          <span className="card__token-label">
            Presale supply:
          </span>
          <span>
            100,000 STY
          </span>
        </div>
        <div className="card__item-token-info">
          <span className="card__token-label">
            Presale price:
          </span>
          <span>
            1 BNB = 1000 STY
          </span>
        </div>
      </div>

      <div className="card__footer mt-[60px]">
        <button className="card__btn-buy font-bold border text-center w-full p-[10px] outline-white outline-[1px] rounded-[6px] text-white">
          Buy Token
        </button>
      </div>
    </div>      
  )
}

export default CardCountDown;
