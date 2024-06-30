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
      <ol>
        {leaderboard &&
          leaderboard.map((position) => {
            return (
              <>
                <li key={position.nickname}>
                  {position.nickname} : {format(position.time, "m.ss.SS")}
                </li>
              </>
            );
          })}
      </ol>
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
