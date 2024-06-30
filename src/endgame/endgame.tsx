import { format } from "date-fns";
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
    <div>
      <h1>Arr! Congrats!</h1>
      <h2>Your time:</h2>
      <h1>{format(time - startTime, "m.ss.SS")}</h1>
      <h2>Enter your nickname</h2>
      <form onSubmit={saveUser} method="post">
        <input
          type="text"
          name="nickname"
          id="nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
