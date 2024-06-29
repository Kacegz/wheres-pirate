import Scene from "../scene/Scene";
import styles from "./App.module.scss";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
//import StartModal from "../startModal/StartModal";
import { useState } from "react";
import Modal from "../modal/Modal";
import { format } from "date-fns";

function App() {
  const [openStart, setOpenStart] = useState(true);
  const [openEnd, setOpenFinish] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalid, setIntervalId] = useState<any>(null);
  const [username, setUsername] = useState("");
  async function startTimer() {
    document.body.style.overflow = "auto";
    const intervalid = setInterval(() => setTime((time) => time + 10), 10);
    setIntervalId(intervalid);
    const response = await fetch("http://localhost:3000/start", {
      credentials: "include",
    });
    const success = await response.json();
    console.log(success);
    if (success) {
    }
  }
  async function stopTimer() {
    document.body.style.overflow = "hidden";
    const response = await fetch("http://localhost:3000/stop", {
      credentials: "include",
    });
    const success = await response.json();
    console.log(success);
    if (success) {
      setTime(success.time);
      clearInterval(intervalid);
    }
  }
  async function saveUser(e: any) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/save", {
      body: username,
      method: "POST",
      credentials: "include",
    });
    const saved = await response.json();
    console.log(saved);
    if (saved) {
      setOpenFinish(false);
      setOpenBoard(true);
    }
  }
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.time}>
          <h1 className={styles.timer}>Time: {format(time, "m.ss.SS")}</h1>
        </div>
        <div className={styles.images}>
          <img src={img1} alt="Captain" srcSet="" className={styles.image} />
          <img src={img2} alt="Pirate" srcSet="" className={styles.image} />
          <img src={img3} alt="Octopus" srcSet="" className={styles.image} />
          <img src={img4} alt="Parrot" srcSet="" className={styles.image} />
        </div>
      </div>
      <Scene setOpenFinish={setOpenFinish} stopTimer={stopTimer} />
      <Modal open={openBoard}>
        <div>board here</div>
      </Modal>
      <Modal open={openEnd}>
        <div>
          <h1>Arr! Congrats!</h1>
          <h2>Your time:</h2>
          <h1>{time}</h1>
          <h2>Enter your nickname</h2>
          <form onSubmit={saveUser} method="post">
            <input
              type="text"
              name="nickname"
              id="nickname"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input type="submit" value="Save" />
          </form>
        </div>
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
