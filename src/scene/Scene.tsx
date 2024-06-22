import styles from "./scene.module.scss"
import background from "../assets/background.gif"

function getCoordinates(coords:any){
    console.log(coords)
}

export default function Scene(){
    return (<>
        <img src={background} alt="" srcSet="" className={styles.background} onClick={(e)=>{getCoordinates(e)}}/>
    </>)
}