export const getQuote = async(currentTrade, Moralis) => {
    await Moralis.initPlugins();
    const data = await Moralis?.Plugins?.oneInch?.quote({
        chain: 'eth', 
        fromTokenAddress: currentTrade?.from?.address, 
        toTokenAddress: currentTrade?.to?.address, 
        amount: currentTrade?.amount,
    });
    return data;
}