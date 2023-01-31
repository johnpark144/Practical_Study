import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseMoveAnimate() {
    const mouseAnimateRef = useRef();
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const onMouseMove = (e) => {
        const mouseX= e.clientX // 마우스x좌표
        const mouseY= e.clientY // 마우스y좌표

        const xDecimal = mouseX / window.innerWidth
        const yDecimal = mouseY / window.innerHeight

        const maxX = window.innerWidth - mouseAnimateRef.current.offsetWidth  // window 전체 width의 돔밖 width를 뺴서 현재 돔의 width를 구함
        const maxY = window.innerHeight - mouseAnimateRef.current.offsetHeight // window 전체 Height의 돔밖 Height를 뺴서 현재 돔의 Height를 구함

        const panX = maxX * xDecimal
        const panY = maxY * yDecimal

        setMouseX(panX)
        setMouseY(panY)
    }
  return (
    <motion.div animate={{
        x: mouseX,
        y: mouseY
        }} onMouseMove={(e)=>onMouseMove(e)} ref={mouseAnimateRef} className="relative w-[80%] h-[700px]">
        <div className="absolute top-[20px] left-[10%] w-[10%] h-[50px] bg-red-600 z-10"></div>
        <div className="absolute top-[50px] left-[30%] w-[10%] h-[100px] bg-red-300 z-10"></div>
        <div className="absolute top-[170px] left-[50%] w-[5%] h-[100px] bg-orange-600 z-10"></div>
        <div className="absolute top-[50px] left-[60%] w-[5%] h-[50px] bg-orange-300 z-10"></div>
        <div className="absolute top-[240px] left-[70%] w-[10%] h-[100px] bg-yellow-600 z-10"></div>
        <div className="absolute top-[120px] left-[80%] w-[10%] h-[50px] bg-yellow-300 z-10"></div>
        <div className="absolute top-[430px] left-[60%] w-[5%] h-[100px] bg-green-600 z-10"></div>
        <div className="absolute top-[440px] left-[40%] w-[5%] h-[50px] bg-green-300 z-10"></div>
        <div className="absolute top-[360px] left-[5%] w-[10%] h-[100px] bg-blue-600 z-10"></div>
        <div className="absolute top-[270px] left-[20%] w-[10%] h-[50px] bg-blue-300 z-10"></div>
        <div className="absolute top-[480px] left-[90%] w-[5%] h-[100px] bg-purple-600 z-10"></div>
    </motion.div>
  )
}
