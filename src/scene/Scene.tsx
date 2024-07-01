import styles from "./scene.module.scss";
import background from "../assets/background.gif";
import { useEffect, useRef, useState } from "react";

export default function Scene({
  setOpenFinish,
  stopTimer,
}: {
  setOpenFinish: Function;
  stopTimer: Function;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<any>([]);
  const [characters, setCharacters] = useState<any[]>([]);
  const [found, setFound] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/characters");
        const data = await response.json();
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        setError("Connection failed");
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function checkWin() {
      const response = await fetch("http://localhost:3000/checkWin", {
        method: "POST",
        body: JSON.stringify(found),
        headers: { "Content-Type": "application/json" },
      });
      const check = await response.json();
      if (check) {
        setOpenFinish(true);
        stopTimer();
      }
    }
    checkWin();
  }, [found]);

  function getCoordinates(coords: any) {
    const coordinates: Array<Number> = [
      Math.round(
        (coords.nativeEvent.offsetX / coords.target.offsetWidth) * 1000
      ),
      Math.round(
        (coords.nativeEvent.offsetY / coords.target.offsetHeight) * 1000
      ),
    ];
    coordinatesRef.current = coordinates;
    return coordinates;
  }

  function moveCursor(
    coordinates: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) {
    if (cursorRef.current) {
      cursorRef.current.style.left = coordinates.pageX - 30 + "px";
      cursorRef.current.style.top = coordinates.pageY - 30 + "px";
      cursorRef.current.style.display = "block";
    }
  }

  function expandDropdown(coordinates: any) {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "flex";
      dropdownRef.current.style.left = coordinates.pageX + 30 + "px";
      dropdownRef.current.style.top = coordinates.pageY + "px";
    }
  }
  async function handleDropdownClick(data: any) {
    dropdownRef!.current!.style.display = "none";
    cursorRef!.current!.style.display = "none";
    const clicked = {
      name: data,
      x: coordinatesRef.current[0],
      y: coordinatesRef.current[1],
    };
    const response = await fetch("http://localhost:3000/check", {
      method: "POST",
      body: JSON.stringify(clicked),
      headers: { "Content-Type": "application/json" },
    });
    const check = await response.json();
    if (check.found) {
      check.pageX = cursorRef.current?.style.left;
      check.pageY = cursorRef.current?.style.top;
      const temp = characters.filter((character) => character !== check.name);
      setCharacters([...temp]);
      setFound([...found, check]);
    }
  }
  return (
    <>
      <img
        src={background}
        alt=""
        srcSet=""
        className={styles.background}
        onClick={(e) => {
          getCoordinates(e);
          moveCursor(e);
          expandDropdown(e);
        }}
      />
      {loading && <div className={styles.loading}></div>}
      {error && (
        <div className={styles.error}>
          <h3>{error}</h3>
        </div>
      )}
      <div ref={cursorRef} className={styles.cursor}></div>

      {found.map((character) => {
        return (
          <div
            className={styles.foundCrosshair}
            key={character.name}
            style={{
              display: "block",
              left: character.pageX,
              top: character.pageY,
            }}
          ></div>
        );
      })}
      <div ref={dropdownRef} className={styles.dropdown}>
        {characters &&
          characters.map((character: any) => {
            return (
              <button
                className={styles.dropdownSelect}
                value={character}
                onClick={() => {
                  handleDropdownClick(character);
                }}
                key={character}
              >
                {character}
              </button>
            );
          })}
      </div>
    </>
  );
}
