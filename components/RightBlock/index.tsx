"use client"

import { Alert, Button, Flex, InputNumber, Progress } from 'antd';
import { useMemo, useState } from 'react';
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
import { BigNumber, utils } from 'ethers';
import { parseIneligibility } from '../../utils/parseIneligibility';

const RightBlock = () => {
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
    const value = parseInt(e.target.value);
    if (value > maxClaimable) {
      setQuantity(maxClaimable);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div>
      <table>
        <tr>
          <td colSpan={2}>
            <Alert message="Informational Notes" type="info" showIcon />
            <br />
          </td>
        </tr>
        <tr>
          <td>
            <span>SELTYPE:</span>
            <br />
            Public
          </td>
          <td>
            <span>START TIME</span>
            <br />
            03:14:30:39
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            PROGRESS BAR:
            <Progress percent={0} showInfo={false} />
            <Flex justify="space-between">
              <p>0 BUSD</p>
              <p>5,000 BUSD</p>
            </Flex>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <span>BUSD SPENT</span> <br />0 BUSD
          </td>
        </tr>
        <tr>
          {isLoading ? (
            <td colSpan={2}>Loading...</td>
          ) : (
            // <td colSpan={2}>
            //   Amount (BUSD)
            //   <br />
            //   <InputNumber min={1} defaultValue={3} />
            //   <br />
            //   <Button className="btn-green  mt-1">Connect Wallet</Button>
            // </td>
            <div>
              <InputNumber
                id="money-input"
                type="number"
                value={quantity}
                onChange={onMoneyChange}
                placeholder="Enter amount to claim"
                className='mb-1 mt-1'
              />
              <Web3Button
                theme="light"
                contractAddress={tokenAddress}
                action={(contract) => contract.erc20.claim(quantity)}
                onSuccess={() => alert('Claimed!')}
                onError={(err) => alert(err)}
              >
                {buttonText}
              </Web3Button>
            </div>
          )}
        </tr>

        <tr>
          <td>
            <span>MIN BUY:</span>
            <br />
            0.001 BUSD
          </td>

          <td>
            <span>TOTAL RAISED:</span>
            <br />0 BUSD
          </td>
        </tr>
        <tr>
          <td>
            <span>CURRENT RATE:</span>
            <br />1 BUSD = 200 STY3
          </td>
        </tr>
      </table>
    </div>
  );
};

export default RightBlock;
