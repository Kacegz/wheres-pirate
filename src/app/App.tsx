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
  const [openEnd, setOpenEnd] = useState(false);
  const [time, setTime] = useState(0);
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
      <Scene setOpenEnd={setOpenEnd} />
      <Modal open={openStart}>
        <button
          onClick={() => {
            setOpenStart(false);
          }}
        >
          Start the game
        </button>
      </Modal>
      <Modal open={openEnd}>
        <div>You won!</div>
      </Modal>
    </>
  );
}

export default App;
