import Scene from "../scene/Scene";
import styles from "./App.module.scss";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import { useState } from "react";
import Modal from "../modal/Modal";
import { format } from "date-fns";
import Start from "../start/Start";
import Endgame from "../endgame/endgame";
import Leaderboard from "../leaderboard/Leaderboard";
interface User {
  nickname: string;
  time: Date;
}
function App() {
  const [openStart, setOpenStart] = useState(true);
  const [openEnd, setOpenFinish] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [intervalid, setIntervalId] = useState<any>(null);
  const [nickname, setNickname] = useState("");
  const [leaderboard, setLeaderboard] = useState<Array<User>>([]);
  async function startTimer() {
    setStartTime(Date.now());
    document.body.style.overflow = "auto";
    const response = await fetch("http://localhost:3000/start", {
      credentials: "include",
    });
    const success = await response.json();
    console.log(success);
    if (success === true) {
      const intervalid = setInterval(() => setTime(Date.now()), 10);
      setIntervalId(intervalid);
    } else {
      console.log(success);
      setStartTime(new Date(success) as any);
      const intervalid = setInterval(() => setTime(Date.now()), 10);
      setIntervalId(intervalid);
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
      clearInterval(intervalid);
    }
  }
  async function saveUser(e: any) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/save", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: nickname }),
      method: "POST",
      credentials: "include",
    });
    const saved = await response.json();
    console.log(saved);
    if (saved) {
      setOpenFinish(false);
      setOpenBoard(true);
      await fetchLeaderboard();
    }
  }
  async function fetchLeaderboard() {
    const request = await fetch("http://localhost:3000/top");
    const users = await request.json();
    setLeaderboard(users);
  }
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.time}>
          <h1 className={styles.timer}>
            Time: {format(time - startTime, "m.ss.SS")}
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
      <Modal open={openBoard}>
        <Leaderboard leaderboard={leaderboard} />
      </Modal>
      <Modal open={openEnd}>
        <Endgame
          time={time}
          startTime={startTime}
          saveUser={saveUser}
          setNickname={setNickname}
        />
      </Modal>
      <Modal open={openStart}>
        <Start setOpenStart={setOpenStart} startTimer={startTimer} />
      </Modal>
    </>
  );
}

export default App;
