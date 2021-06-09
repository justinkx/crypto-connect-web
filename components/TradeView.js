import React, { memo, useRef, useEffect, useCallback, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const TradeView = ({ initialChartData }) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  const setInitialData = useCallback(() => {
    const candleSeries = chart?.current?.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });
    console.log("initialChartData", candleSeries);
    candleSeries.setData(initialChartData);
  }, [initialChartData]);

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
    setInitialData();
  }, [setInitialData]);

  return <div ref={chartContainerRef} className="container" />;
};

export default memo(TradeView);
