import React, { memo, useRef, useEffect, useCallback, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

import { priceData } from "./data/pricedata";
import { volumeData } from "./data/volumeData";
import { fetchCandleStickData } from "./utils/fetchService";

const TradeView = ({ pair = "BTCUSD" }) => {
  const [candleStickData, setCandleData] = useState([]);

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  const fetchCandleData = useCallback(async () => {
    const candleData = await fetchCandleStickData();
    setCandleData(candleData);
  }, []);

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });

    fetchCandleData();
  }, []);

  const candleSeries = chart?.current?.addCandlestickSeries({
    upColor: "#4bffb5",
    downColor: "#ff4976",
    borderDownColor: "#ff4976",
    borderUpColor: "#4bffb5",
    wickDownColor: "#838ca1",
    wickUpColor: "#838ca1",
  });

  candleSeries?.setData(candleStickData);

  // useEffect(() => {
  //   resizeObserver.current = new ResizeObserver((entries) => {
  //     const { width, height } = entries[0].contentRect;
  //     chart.current.applyOptions({ width, height });
  //     setTimeout(() => {
  //       chart.current.timeScale().fitContent();
  //     }, 0);
  //   });

  //   resizeObserver.current.observe(chartContainerRef.current);

  //   return () => resizeObserver.current.disconnect();
  // }, []);

  return <div ref={chartContainerRef} className="container" />;
};

export default memo(TradeView);
