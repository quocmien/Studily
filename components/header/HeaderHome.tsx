"use client"
import { Alert, Button, Flex, InputNumber, Progress } from 'antd';
import { useMemo, useState, useRef } from 'react';
import {
  useAddress,
  useContract,
  Web3Button,
} from '@thirdweb-dev/react';
import { Select, Space } from 'antd';

const HeaderHome = () => {
  const tokenAddress = '0x56E4F14f6aB7d5Fc9eEE4b01CCdD761583F13B6F';
  const { contract } = useContract(tokenAddress, 'token-drop');
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);

  const menu = [
    {
      id: 'home',
      label: 'Home'
    },
    {
      id: 'about',
      label: 'About'
    },
    {
      id: 'token',
      label: 'Tokenomics'
    },
    {
      id: 'road-map',
      label: 'Roadmap'
    },
    {
      id: 'team',
      label: 'Team'
    }
  ]
  const [activeMenu, setActiveMenu] = useState('home');
  const HomeSection = useRef(null);
  const AboutSection = useRef(null);
  const onclickMenu = (id: string) => {
    
    setActiveMenu(id);
    // switch (id) {
    //   case 'home':
    //     HomeSection?.current.scrollIntoView({ behavior: 'smooth' });
    //     break;
    //   case 'about':
    //     AboutSection.current.scrollIntoView({ behavior: 'smooth' });
    //     break;
    //   // Add cases for other sections as needed
    //   default:
    //     break;
    // }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 md:col-span-3">
            <div className="header__logo text-center w-[60px]">
              <img width="60px" height="60px" src="/logo.png" alt="Studily" className="logo" />
              <h3 className="hidden md:inline-block uppercase header__text-logo color-primary">
                Studily
              </h3>
            </div>
          </div>

          <div className="col-span-6 hidden md:flex">
            <ul className="list-none header__menu">
              {
                menu.map(item => {
                  return (
                    <li
                      onClick={() => onclickMenu(item.id)}
                      key={item.id}
                      id={item.id}
                      className={`header__item-menu cursor-pointer ${activeMenu === item.id ? 'font-bold active' : ''}`}
                      >
                      {item.label}
                    </li>
                  )
                })
              }
             
            </ul>
          </div>

          <div className="col-span-7 md:col-span-3 header__right gap-[40px] items-center">
            <Select
              className='
              outline button outline-primary outline-[1px]
              rounded-[4px] font-bold color-primary h-[28px]'
              defaultValue="en-US"
              style={{ width: 120 }}
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en-US', label: 'English' },
              ]}
            />
            <Web3Button
              className="header__btn-connect-wallet
                outline button outline-primary border outline-[1px]
                rounded-[6px] btn__connect-wallet font-bold color-primary font-bold"
              contractAddress={tokenAddress}
              action={(contract) => contract.erc20.claim(quantity)}
              onSuccess={() => alert('Claimed!')}
              onError={(err) => alert(err)}
            >
              Connect wallet
            </Web3Button>
          </div>
        </div>
      </div>
    </header>
  ) 
}

export default HeaderHome;
