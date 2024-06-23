import styles from "./scene.module.scss"
import background from "../assets/background.gif"

function getCoordinates(coords:any){
    const coordinates:Array<Number>=[Math.round(coords.nativeEvent.offsetX/coords.target.offsetWidth*100),Math.round(coords.nativeEvent.offsetY/coords.target.offsetHeight*100)]
    console.log(coordinates)
}

export default function Scene(){
    return (<>
        <img src={background} alt="" srcSet="" className={styles.background} onClick={(e)=>{getCoordinates(e)}}/>
    </>)
}