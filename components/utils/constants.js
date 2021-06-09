import { CrosshairMode } from "lightweight-charts";

export const BASE_URL = "https://api.binance.com/api/v3/klines?";
export const WS_URL = "wss://stream.binance.com:9443/ws";

export const condleStickDefaultConfig = {
  upColor: "#00c176",
  downColor: "#cf304a",
  borderDownColor: "#bd2e46",
  borderUpColor: "#1d7952",
  wickDownColor: "#838ca1",
  wickUpColor: "#838ca1",
};

export const histogramDefaultConfig = {
  base: 0,
  lineWidth: 2,
  priceFormat: {
    type: "volume",
  },
  overlay: true,
  scaleMargins: {
    top: 0.8,
    bottom: 0,
  },
};
