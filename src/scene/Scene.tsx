import styles from "./scene.module.scss";
import background from "../assets/background.gif";
import { useEffect, useRef, useState } from "react";

export default function Scene() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<any>([]);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/characters");
        const data = await response.json();
        setCharacters(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError("Connection failed");
      }
    }
    fetchData();
  }, []);
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
    console.log(coordinates);
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
  function handleDropdownClick(data: any) {
    dropdownRef!.current!.style.display = "none";
    cursorRef!.current!.style.display = "none";
    const result = characters.filter(
      (character) => character.name === data.name
    )[0];
    if (result) {
      if (
        result.x + 15 >= coordinatesRef.current[0] &&
        coordinatesRef.current[0] >= result.x - 15 &&
        result.y + 15 >= coordinatesRef.current[1] &&
        coordinatesRef.current[1] >= result.y - 15
      ) {
        const temp = characters.filter(
          (character) => character.name !== data.name
        );
        result.found = true;
        result.pageX = cursorRef.current?.style.left;
        result.pageY = cursorRef.current?.style.top;
        return setCharacters([...temp, result]);
      }
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
      {error && <div className={styles.error}>{error}</div>}
      <div ref={cursorRef} className={styles.cursor}></div>
      {characters.map((character) => {
        if (character.found) {
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
        }
      })}
      <div ref={dropdownRef} className={styles.dropdown}>
        {characters &&
          characters.map((character: any) => {
            if (character.found) return;
            return (
              <button
                className={styles.dropdownSelect}
                value={character.name}
                onClick={() => {
                  handleDropdownClick(character);
                }}
                key={character.name}
              >
                {character.name}
              </button>
            );
          })}
      </div>
    </>
  );
}
