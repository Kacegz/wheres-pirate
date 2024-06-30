export default function Start({
  setOpenStart,
  startTimer,
}: {
  setOpenStart: Function;
  startTimer: Function;
}) {
  return (
    <>
      <h1>Welcome to Where's Pirate!</h1>
      <p>Arr!</p>
      <p>You must find all 4 characters</p>
      <p>Remember, you are timed!</p>
      <button
        onClick={() => {
          setOpenStart(false);
          startTimer();
        }}
      >
        Start the game
      </button>
    </>
  );
}
