import styles from "./scene.module.scss";
import background from "../assets/background.gif";
import { useRef } from "react";

export default function Scene() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<Array<Number>>([]);

  function getCoordinates(coords: any) {
    const coordinates: Array<Number> = [
      Math.round(
        (coords.nativeEvent.offsetX / coords.target.offsetWidth) * 1000
      ),
      Math.round(
        (coords.nativeEvent.offsetY / coords.target.offsetHeight) * 1000
      ),
    ];
    console.log(coordinates);
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
  function handleDropdownClick() {
    dropdownRef!.current!.style.display = "none";
    cursorRef!.current!.style.display = "none";
    console.log(coordinatesRef.current);
    coordinatesRef.current = [];
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
      <div ref={cursorRef} className={styles.cursor}></div>
      <div ref={dropdownRef} className={styles.dropdown}>
        <button
          className={styles.dropdownSelect}
          value="first"
          onClick={() => {
            handleDropdownClick();
          }}
        >
          First
        </button>
        <button className={styles.dropdownSelect} value="second">
          Second
        </button>
        <button className={styles.dropdownSelect} value="third">
          Third
        </button>
      </div>
    </>
  );
}
