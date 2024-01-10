"use client"
import { Slider } from 'antd';
import { InputNumber } from 'antd';
import { useMemo, useState, useEffect } from 'react';
import { BigNumber, utils } from 'ethers';
import {
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTokenSupply,
  Web3Button,
} from '@thirdweb-dev/react';

const CardCountDown = () => {
  const tokenAddress = '0x56E4F14f6aB7d5Fc9eEE4b01CCdD761583F13B6F';
  const { contract } = useContract(tokenAddress, 'token-drop');
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);

  interface TimeLeft {
    days: number | 1;
    hours: number | 1;
    minutes: number | 1;
    seconds: number| 1;
  }

  const marks = {
    50: {
      style: {
        color: '#fff',
      },
      label: <strong>50K BUSD</strong>,
    },
    100: {
      style: {
        color: '#fff',
      },
      label: <strong>100K BUSD</strong>,
    }
  };

  const activeClaimCondition = useActiveClaimConditionForWallet(
    contract,
    address
  );
  const claimerProofs = useClaimerProofs(contract, address || '');

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000_000);
    }
  }, [activeClaimCondition.data?.availableSupply]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === '0') {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max;
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000_000)) {
      return 1_000_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);


  const onMoneyChange = (e: any) => {
    const value = parseInt(e.target.value);
    if (value > maxClaimable) {
      setQuantity(maxClaimable);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };


  const calculateTimeLeft = () => {
    const difference = +new Date('2024-02-29T23:59:59') - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[`${interval}`]) {
      return null;
    }

    return (
        <div className="card__item-count-down" key={interval}>
          <p className="card__time">
          {timeLeft[interval]}
          </p>
          <span className="card__text-time">
            {interval} {' '}
          </span>
        </div>
    );
  });


  return (
    <div className="card card-count-down shadow p-[15px] md:p-[32px] rounded-[20px] w-full mt-[25px] md:mt-0">
      <div className="card__header">
        <h3 className="font-bold card__title-header">
          Studily Token is on presale
        </h3>
        <p>
          Studily token ends in February 29, 2024
        </p>
      </div>
      <div className="card__count-down flex">

        {timerComponents.length ? (
          timerComponents
        ) : (
          <span>Countdown Complete!</span>
        )}
      </div>

      <div className="card__progress">
        <div className="card__progress-title">
          <span>Current Progress</span>
        </div>
        <Slider disabled={true} marks={marks} defaultValue={50} />
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

      <div className="card__amount-token mt-[30px] md:mt-[60px]">
      <InputNumber
        id="money-input"
        type="number"
        min={0}
        defaultValue={1}
        value={quantity}
        onChange={onMoneyChange}
        placeholder="Enter amount to claim"
        className='w-full p-[5px] rounded-[8px] mb-[10px] md:mb-[20px]'
      />
       <Web3Button
          className="card__btn-buy font-bold border
            text-center w-full p-[5px] outline-white outline-[1px]
            rounded-[6px] text-white"
          contractAddress={tokenAddress}
          action={(contract) => contract.erc20.claim(quantity)}
          onSuccess={() => alert('Claimed!')}
          onError={(err) => alert(err)}
        >
          Buy Token
        </Web3Button>
      </div>
    </div>      
  )
}

export default CardCountDown;
