const SupportWallet = () => {
  const listWallet = [
    {
      id: 'wallet',
      image: '/metamask.svg',
      label: 'Metamask'
    },
    {
      id: 'coinbase',
      image: '/coinbase.svg',
      label: 'Metamask'
    },
    {
      id: 'wallet',
      image: '/wallet.svg',
      label: 'WalletConnect'
    },
    {
      id: 'trust',
      image: '/trust.svg',
      label: 'Trust Wallet'
    },
    {
      id: 'rainbow',
      image: '/rainbow.svg',
      label: 'Rainbow'
    },
    {
      id: 'zerion',
      image: '/zerion.svg',
      label: 'Zerion Wallet'
    },
    {
      id: 'phantom',
      image: '/phantom.svg',
      label: 'Phantom'
    }
  ]
  return (
    <section className="support-wallet md:pt-[80px]">
      <div className="support-wallet__intro">
        <h3 className="--title support-wallet__title text-center">
          Wallets We Support
        </h3>
        <p className="--desc text-center mt-[12px]">
          Trade with world’s most trusted & fastest wallets
        </p>
      </div>

      <div className="support-wallet__list">
        <ul className="support-wallet__list-container flex items-center w-full mt-[110px]">
          {
            listWallet.map(wallet => {
              return (
                <li
                  key={wallet.id}
                  className="support-wallet__item text-center flex-1 text-center"
                >
                  <div className="support-wallet__item-logo text-center">
                    <img className="m-auto" width="53px" src={wallet.image} alt={wallet.label} />
                  </div>
                  <span className="support-wallet__item-title --small uppercase">
                    {wallet.label}
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default SupportWallet;
