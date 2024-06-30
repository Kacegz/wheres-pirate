import { format } from "date-fns";
import styles from "./endgame.module.scss";
interface Params {
  time: number;
  startTime: number;
  saveUser: any;
  setNickname: Function;
}
export default function Endgame({
  time,
  startTime,
  saveUser,
  setNickname,
}: Params) {
  return (
    <>
      <h1>Congratulations!</h1>
      <p>You found all characters</p>
      <h3>Your time:</h3>
      <h3>{format(time - startTime, "m.ss.SS")} seconds</h3>
      <p>Enter your nickname:</p>
      <form onSubmit={saveUser} method="post">
        <div className={styles.flex}>
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          <input type="submit" value="Save" />
        </div>
      </form>
    </>
  );
}
