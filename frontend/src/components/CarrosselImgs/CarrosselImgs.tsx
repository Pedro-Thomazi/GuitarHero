import styles from './CarrosselImgs.module.css'

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import video from "../../assets/videos/13107443_1280_720_24fps.mp4"
import img1 from "../../assets/images/pexels-cottonbro-5650704.jpg"
import img2 from "../../assets/images/pexels-stephendn-63695.jpg"
import { useEffect, useState } from 'react';

const CarrosselImgs = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1) % 3);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + 3) % 3);
  };

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.carrossel}>
      <video style={{ marginLeft: `-${index * 100}%` }} className={styles.displayImg} id={styles.display1} src={video} autoPlay muted loop></video>
      <img className={styles.displayImg} id={styles.display2} src={img1} alt="" />
      <img className={styles.displayImg} id={styles.display3} src={img2} alt="" />

      <div className={styles.btnsActions}>
        <button onClick={prev} className={styles.prev}><FaAngleLeft size={30} /></button>
        <div className={styles.labels}>
          <input className={styles.input1} checked={index === 0} type="radio" name="labelRadio" id="label1" />
          <label className={styles.label1} onClick={() => setIndex(0)} htmlFor="label1"></label>
          <input className={styles.input2} checked={index === 1} type="radio" name="labelRadio" id="label2" />
          <label className={styles.label2} onClick={() => setIndex(1)} htmlFor="label2"></label>
          <input className={styles.input3} checked={index === 2} type="radio" name="labelRadio" id="label3" />
          <label className={styles.label3} onClick={() => setIndex(2)} htmlFor="label3"></label>
        </div>
        <button onClick={next} className={styles.next}><FaAngleRight size={30} /></button>
      </div>
    </div>
  )
}

export default CarrosselImgs