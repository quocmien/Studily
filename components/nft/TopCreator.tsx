const TopCreator = () => {
  const creators = [
    {
      name: 'David',
      position: 'Developer'
    },
    {
      name: 'Steven',
      position: 'Teacher Marketing'
    },
    {
      name: 'TES',
      position: 'Research Engineer'
    },
    {
      name: 'CAO NGUYEN',
      position: 'Master Blockchain'
    },
  ]
  return (
    <section className="top-creator pt-[60px] md:pt[120px] pb-[60px] md:pb-[120px]">
      <div className="top-creator__intro">
        <h3 className="top-creator__title --title text-center">
          Top Creator of The Month
        </h3>
        <p className="top-creator__desc --desc text-center">
          Explore our newly released NFT collection
        </p>
      </div>

      <div className="top-creator__list">
        <ul className="top-creator__list-main flex flex-wrap items-center mt-[30px] md:mt-[60px]">
          {
            creators.map((creator, index) => {
              return (
                <li key={index} className="top-creator__item-creator w-[50%] flex md:flex-1 items-center gap-[16px]">
                  <div className="avatar w-[60px]">
                    <div className="avatar__background --background pt-[100%] bg-white rounded-[100%] border" />
                  </div>
                  <div className="top-creator__info">
                    <h4 className="top-creator__name flex items-center gap-[8px]">
                      {creator.name}

                      <img src="/check.svg" alt="check" />
                    </h4>
                    <span className="top-creator__position">
                      {creator.position}
                    </span>
                  </div>
                </li>
              )
            })
          }
          
        </ul>
      </div>
    </section>
  )
}

export default TopCreator;
