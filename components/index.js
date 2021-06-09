import React, { memo, useEffect, useCallback, useState, useRef } from "react";

import { fetchCandleStickData } from "./utils/fetchService";
import TradeView from "./TradeView";
import { WS_URL } from "./utils/constants";
import { candleSocketAdaptor } from "./utils/adaptor";

const TradeViewChart = ({ pair = "BTCUSD", interval = "1m" }) => {
  const [candleStickData, setCandleData] = useState(null);
  const [updatedata, setUpdateData] = useState(null);

  const fetchCandleData = useCallback(async () => {
    const candleData = await fetchCandleStickData(pair);
    setCandleData(candleData);
  }, [pair]);

  useEffect(() => {
    fetchCandleData();
  }, [fetchCandleData]);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}/${pair.toLocaleLowerCase()}@kline_${interval}`
    );
    ws.onopen = () => console.log("open");
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      const parsedMessage = candleSocketAdaptor(message);
      setUpdateData(parsedMessage);
    };
    return () => {
      ws.close();
    };
  }, [pair, interval]);

  if (!candleStickData) return null;
  return (
    <TradeView updatedata={updatedata} initialChartData={candleStickData} />
  );
};

export default memo(TradeViewChart);
