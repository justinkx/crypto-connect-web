import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const TradeViewChart = dynamic(() => import("../components/index"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const { pair = "BTCBUSD" } = router.query;
  return (
    <div className="container">
      <TradeViewChart pair={pair} />
    </div>
  );
}
