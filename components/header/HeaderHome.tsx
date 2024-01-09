const HeaderHome = () => {
return (
  <header className="header">
    <div className="container">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div className="header__logo text-center w-[60px]">
            <img width="60px" height="60px" src="/logo.png" alt="Studily" className="logo" />
            <h3 className="uppercase">
              Studily
            </h3>
          </div>
        </div>

        <div className="col-span-6 menu">
          <ul className="list-none header__menu">
            <li className="header__item-menu">
              Home
            </li>
            <li className="header__item-menu">
              course
            </li>
            <li className="header__item-menu">
              Teacher
            </li>
            <li className="header__item-menu">
              Docs
            </li>
          </ul>
        </div>

        <div className="col-span-3 header__right">
          <button className="header__btn-connect-wallet outline button outline-primary outline-[1px] rounded-[6px] btn__connect-wallet font-bold color-primary">
            Connect wallet
          </button>
        </div>
      </div>
    </div>
  </header>
) 
}

export default HeaderHome;
