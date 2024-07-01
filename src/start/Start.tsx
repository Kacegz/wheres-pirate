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
      <p>Prepare for a Swashbuckling Adventure!</p>
      <p>Your mission is to locate and tag all 4 characters.</p>
      <p>Stay sharp and be quick, as every second counts in this hunt!</p>
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
