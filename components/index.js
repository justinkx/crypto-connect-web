import React, { memo, useEffect, useCallback, useState } from "react";

import { fetchCandleStickData } from "./utils/fetchService";
import TradeView from "./TradeView";

const TradeViewChart = ({ pair = "BTCUSD", interval = "1m" }) => {
  const [candleStickData, setCandleData] = useState(null);
  const fetchCandleData = useCallback(async () => {
    const candleData = await fetchCandleStickData(pair);
    setCandleData(candleData);
  }, [pair]);

  useEffect(() => {
    fetchCandleData();
  }, [fetchCandleData]);

  if (!candleStickData) return null;
  return <TradeView initialChartData={candleStickData} />;
};

export default memo(TradeViewChart);
