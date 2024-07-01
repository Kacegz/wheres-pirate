import styles from "./leaderboard.module.scss";
import { format } from "date-fns";
interface User {
  nickname: string;
  time: Date;
}
export default function Leaderboard({
  leaderboard,
}: {
  leaderboard: Array<User>;
}) {
  return (
    <>
      <h1>Leaderboard:</h1>
      <table className={styles.table}>
        {leaderboard &&
          leaderboard.map((position, index) => {
            return (
              <tbody key={position.nickname} className={styles.section}>
                <tr>
                  <td>{index + 1}. </td>
                  <td>{position.nickname}</td>
                  <td>{format(position.time, "m.ss.SS")}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Restart
      </button>
    </>
  );
}
