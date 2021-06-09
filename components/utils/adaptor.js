export const candleStickAdaptor = (data) => {
  const [
    openTime,
    open,
    high,
    low,
    close,
    volume,
    closeTime,
    quoteAssetVolume,
    numberOfTrades,
    takerBuyBaseAssetVolume,
    takerBuyQuotessetVolume,
    ignore,
  ] = data;
  return {
    time: openTime / 1000,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
    volume: parseFloat(volume),
    // closeTime,
    // quoteAssetVolume,
    // numberOfTrades,
    // takerBuyBaseAssetVolume,
    // takerBuyQuotessetVolume,
    // ignore,
  };
};
