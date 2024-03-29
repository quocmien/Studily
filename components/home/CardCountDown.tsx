"use client"

import { Slider, message, Button, Flex, InputNumber, Progress } from 'antd';
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
import { parseIneligibility } from '../../utils/parseIneligibility';

const CardCountDown = () => {
  const tokenAddress = '0x56E4F14f6aB7d5Fc9eEE4b01CCdD761583F13B6F';
  const { contract } = useContract(tokenAddress, 'token-drop');
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const { data: contractMetadata } = useContractMetadata(contract);

  const claimConditions = useClaimConditions(contract);
  const activeClaimCondition = useActiveClaimConditionForWallet(
    contract,
    address
  );
  const claimerProofs = useClaimerProofs(contract, address || '');
  const claimIneligibilityReasons = useClaimIneligibilityReasons(contract, {
    quantity,
    walletAddress: address || '',
  });

  const claimedSupply = useTokenSupply(contract);

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000_000);
    }
  }, [activeClaimCondition.data?.availableSupply]);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data?.value || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(
      BigNumber.from(claimedSupply.data?.value || 0)
    );
    if (n.gte(1_000_000_000)) {
      return '';
    }
    return n.toString();
  }, [totalAvailableSupply, claimedSupply]);

  const priceToMint = useMemo(() => {
    if (quantity) {
      const bnPrice = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      return `${utils.formatUnits(
        bnPrice.mul(quantity).toString(),
        activeClaimCondition.data?.currencyMetadata.decimals || 18
      )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
    }
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

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

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        numberClaimed === numberTotal
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return activeClaimCondition.isLoading || !contract;
  }, [activeClaimCondition.isLoading, contract]);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );
  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return 'Sold Out';
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return 'Mint (Free)';
      }
      return `Mint (${priceToMint})`;
    }
    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }
    if (buttonLoading) {
      return 'Checking eligibility...';
    }

    return 'Claiming not available';
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  const onMoneyChange = (e: any) => {
    const value = parseInt(e);
    if (value > maxClaimable) {
      setQuantity(maxClaimable);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  interface TimeLeft {
    days: number | 1;
    hours: number | 1;
    minutes: number | 1;
    seconds: number| 1;
  }

  const marks = {
    0: {
      style: {
        color: '#fff',
      },
      label: <strong>0 BUSD</strong>,
    },
    100: {
      style: {
        color: '#fff',
      },
      label: <strong>100K BUSD</strong>,
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

  const openClaim = timeLeft.days <= 0 && timeLeft.hours <= 0 &&  timeLeft.minutes <= 0 && timeLeft.seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const [messageApi, contextHolder] = message.useMessage();

  const onSuccessClaim = (e: any) => {
    messageApi.open({
      type: 'success',
      content: `Claim ${quantity} STY to success!`
    })
  }

  const onErrorClaim = (e: any) => {
    messageApi.open({
      type: 'error',
      content: `Error method claim!`
    })
  }


  return (
    <div className="card card-count-down shadow
      p-[15px] md:p-[32px] rounded-[20px] w-full
      mt-[25px] md:mt-0"
    >
      <div className="card__header">
        <h3 className="font-bold card__title-header">
          Studily Token is on presale
        </h3>
        <p>
          Studily token ends in February 29, 2024
        </p>
      </div>

      <div className="card__count-down flex">
        <div className="card__item-count-down">
          <p className="card__time">
          {timeLeft.days}
          </p>
          <span className="card__text-time">
            Days
          </span>
        </div>
        <div className="card__item-count-down">
          <p className="card__time">
          {timeLeft.hours}
          </p>
          <span className="card__text-time">
            Hours
          </span>
        </div>
        <div className="card__item-count-down">
          <p className="card__time">
          {timeLeft.minutes}
          </p>
          <span className="card__text-time">
            Minutes
          </span>
        </div>
        <div className="card__item-count-down">
          <p className="card__time">
          {timeLeft.seconds}
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
        <Slider disabled={true} marks={marks} defaultValue={0} />
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
        { contextHolder }
        {
          openClaim  ? 
            <InputNumber
              id="money-input"
              type="number"
              min={0}
              value={quantity}
              onChange={onMoneyChange}
              placeholder="Enter amount to claim"
              className='w-full p-[5px] rounded-[8px] mb-[10px] md:mb-[20px]'
            />
            : ''
        }

        {
          openClaim ? 
          
            <Web3Button
              className="card__btn-buy font-bold border
                text-center w-full p-[5px] outline-white outline-[1px]
                rounded-[6px] text-white"
              contractAddress={tokenAddress}
              action={(contract) => contract.erc20.claim(quantity)}
              onSuccess={onSuccessClaim}
              onError={onErrorClaim}
            >
              {buttonText}
            </Web3Button>
            : 
            <Button className='card__btn-buy font-bold border
            text-center w-full p-[5px] outline-white outline-[1px]
            rounded-[6px] text-white h-[43px]' disabled>
              Buy token
            </Button>
        }
        
      </div>
    </div>      
  )
}

export default CardCountDown;
