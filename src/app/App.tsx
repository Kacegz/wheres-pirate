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
  const [intervalid, setIntervalId] = useState<number | undefined>();
  const [nickname, setNickname] = useState("");
  const [inputError, setInputError] = useState("");
  const [leaderboard, setLeaderboard] = useState<Array<User>>([]);
  async function startGame() {
    setStartTime(Date.now());
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
    const response = await fetch(
      "https://kacegz-wheres-pirate.up.railway.app/start",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data === true) {
      const intervalid = setInterval(() => setTime(Date.now()), 10);
      setIntervalId(intervalid);
    } else {
      setStartTime(new Date(data) as any);
      const intervalid = setInterval(() => setTime(Date.now()), 10);
      setIntervalId(intervalid);
    }
  }
  async function stopGame() {
    document.body.style.overflow = "hidden";
    const response = await fetch(
      "https://kacegz-wheres-pirate.up.railway.app/stop",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data) {
      clearInterval(intervalid);
    }
  }
  async function saveUser(e: React.ChangeEvent<SubmitEvent>) {
    e.preventDefault();
    const response = await fetch(
      "https://kacegz-wheres-pirate.up.railway.app/save",
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname }),
        method: "POST",
        credentials: "include",
      }
    );
    const saved = await response.json();
    if (!saved.error) {
      setOpenFinish(false);
      setOpenBoard(true);
      await fetchLeaderboard();
    } else {
      setInputError(saved.error);
    }
  }
  async function fetchLeaderboard() {
    const request = await fetch(
      "https://kacegz-wheres-pirate.up.railway.app/top"
    );
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
      <Scene setOpenFinish={setOpenFinish} stopGame={stopGame} />
      <Modal open={openBoard}>
        <Leaderboard leaderboard={leaderboard} />
      </Modal>
      <Modal open={openEnd}>
        <Endgame
          time={time}
          startTime={startTime}
          saveUser={saveUser}
          setNickname={setNickname}
          inputError={inputError}
        />
      </Modal>
      <Modal open={openStart}>
        <Start setOpenStart={setOpenStart} startGame={startGame} />
      </Modal>
    </>
  );
}

export default App;
