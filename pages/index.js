import styles from "../styles/Home.module.css";

import TradeView from "../components/TradeView";

export default function Home() {
  return (
    <div className={styles.container}>
      <TradeView />
    </div>
  );
}
