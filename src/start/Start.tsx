import loadingImg from "../assets/parrot.png";
import styles from "./start.module.scss";
import { isMobile } from "react-device-detect";
export default function Start({
  setOpenStart,
  startGame,
}: {
  setOpenStart: Function;
  startGame: Function;
}) {
  return (
    <>
      <img src={loadingImg} className={styles.parrot} alt="" />
      <h1>Welcome to Where's Pirate!</h1>
      {isMobile && (
        <h3 style={{ color: "red" }}>WARNING: Mobile devices unsupported</h3>
      )}
      <p>Prepare for a Swashbuckling Adventure!</p>
      <p>Your mission is to locate and tag all 4 characters.</p>
      <p>Stay sharp and be quick, as every second counts in this hunt!</p>
      <button
        onClick={() => {
          setOpenStart(false);
          startGame();
        }}
      >
        Start the game
      </button>
    </>
  );
}
