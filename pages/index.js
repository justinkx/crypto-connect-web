import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const TradeView = dynamic(() => import("../components/TradeView"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const { pair = null } = router.query;
  return (
    <div className="container">
      <TradeView pair={pair} />
    </div>
  );
}
