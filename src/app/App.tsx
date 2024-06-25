import { useState } from "react";
import Scene from "../scene/Scene";
import styles from "./App.module.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={styles.nav}>navbar</div>
      <Scene />
    </>
  );
}

export default App;
