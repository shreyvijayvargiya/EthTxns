export const getTokens = async(Moralis) => {
    await Moralis.initPlugins();
    const data = await Moralis?.Plugins?.oneInch?.getSupportedTokens({ chain: 'eth' })
    return data?.tokens;
}
