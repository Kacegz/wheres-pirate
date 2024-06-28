import Scene from "../scene/Scene";
import styles from "./App.module.scss";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
//import StartModal from "../startModal/StartModal";
import { useState } from "react";
import Modal from "../modal/Modal";

function App() {
  const [openStart, setOpenStart] = useState(true);
  const [openEnd, setOpenFinish] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalid, setIntervalId] = useState<any>(null);
  function startTimer() {
    const intervalid = setInterval(() => setTime((time) => time + 1), 10);
    setIntervalId(intervalid);
  }
  function stopTimer() {
    clearInterval(intervalid);
  }
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.time}>
          <h1 className={styles.timer}>
            Time: {Math.floor((time % 6000) / 100)}.{time % 100}
          </h1>
        </div>
        <div className={styles.images}>
          <img src={img1} alt="Captain" srcSet="" className={styles.image} />
          <img src={img2} alt="Pirate" srcSet="" className={styles.image} />
          <img src={img3} alt="Octopus" srcSet="" className={styles.image} />
          <img src={img4} alt="Parrot" srcSet="" className={styles.image} />
        </div>
      </div>
      <Scene setOpenFinish={setOpenFinish} stopTimer={stopTimer} />
      <Modal open={openEnd}>
        <div>You won!</div>
      </Modal>
      <Modal open={openStart}>
        <button
          onClick={() => {
            setOpenStart(false);
            startTimer();
          }}
        >
          Start the game
        </button>
      </Modal>
    </>
  );
}

export default App;
