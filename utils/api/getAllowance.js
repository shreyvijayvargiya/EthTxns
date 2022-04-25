
export const getSwapAllowance = async (
  currentTrade,
  Moralis,
  walletAddress,
  useOneInchSwap
) => {
  let quoteData;
  await Moralis.initPlugins();
  const allowance = await Moralis?.Plugins?.oneInch?.hasAllowance({
    fromTokenAddress: currentTrade?.from?.address,
    fromAdress: walletAddress,
    amount: currentTrade?.amount,
    chain: "eth",
  });
  console.log(allowance, 'allowance')
  if (!allowance) {
    // get the allowance
    await Moralis?.Plugins?.oneInch?.approve({
      chain: "eth",
      tokenAddress: currentTrade?.to?.address,
      fromAdress: walletAddress,
    });
  } else {
    // Do swap
    const swapToken = await Moralis?.Plugins?.oneInch?.swap({
      chain: "eth",
      fromTokenAddress: currentTrade?.from?.address,
      toTokenAddress: currentTrade?.to?.address,
      amount: currentTrade?.amount,
      fromAdress: walletAddress,
      slippage: 1,
    });
    console.log(swapToken)
  }
  return quoteData;
};