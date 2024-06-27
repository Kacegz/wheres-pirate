import Scene from "../scene/Scene";
import styles from "./App.module.scss";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import StartModal from "../startModal/StartModal";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(1);
  const [intervalId, setIntervalId] = useState<Number>();
  const startCountHandler = () => {
    const intervalid: number = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    setIntervalId(intervalid);
  };
  const stopCountHandler = () => {
    clearInterval(intervalId);
  };
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.time}>
          <h1>Time: {time}</h1>
        </div>
        <div className={styles.images}>
          <img src={img1} alt="Captain" srcSet="" className={styles.image} />
          <img src={img2} alt="Pirate" srcSet="" className={styles.image} />
          <img src={img3} alt="Octopus" srcSet="" className={styles.image} />
          <img src={img4} alt="Parrot" srcSet="" className={styles.image} />
        </div>
      </div>
      <Scene stopCounting={stopCountHandler} />
      <StartModal startTimer={startCountHandler} />
    </>
  );
}

export default App;
