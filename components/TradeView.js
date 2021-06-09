import React, { memo, useRef, useEffect, useCallback } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

import {
  condleStickDefaultConfig,
  histogramDefaultConfig,
} from "./utils/constants";

const TradeView = ({
  initialChartData,
  updatedata = null,
  candleStickConfig = condleStickDefaultConfig,
  histogramConfig = histogramDefaultConfig,
}) => {
  const resizeObserver = useRef();
  const chartContainerRef = useRef();
  const chart = useRef();
  const candleSeries = useRef();
  const volumeSeries = useRef();

  const setInitialData = useCallback(() => {
    candleSeries.current =
      chart?.current?.addCandlestickSeries(candleStickConfig);
    candleSeries.current.setData(initialChartData);
    volumeSeries.current = chart.current.addHistogramSeries(histogramConfig);
    volumeSeries?.current?.setData(initialChartData);
  }, [initialChartData, candleStickConfig]);

  useEffect(() => {
    if (updatedata) {
      candleSeries?.current?.update(updatedata);
      volumeSeries?.current?.update(updatedata);
    }
  }, [updatedata]);

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
        timeVisible: true,
        secondsVisible: false,
      },
    });
    setInitialData();
  }, [setInitialData]);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({
        width,
        height,
      });
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);
  return <div ref={chartContainerRef} className="container" />;
};

export default memo(TradeView);
