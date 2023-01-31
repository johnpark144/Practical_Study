'use client'
import { motion } from 'framer-motion';

export default function BackgroundCircles() {
  return (
    // 서클 애니메이션
    <motion.div 
    initial={{
      opacity: 0,
    }}
    animate={{
      scale: [1, 2, 2, 3, 1],
      opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
      borderRadius: ["20%","20%","50%","80%","20%",]
    }} 
    transition={{
      duration:2.5,
    }}
    className="relative flex justify-center items-center">
      <div className="absolute border border-[#333333] rounded-full h-[200px] w-[200px] mt-52 animate-ping" />{/* 퍼지는 효과 */}
      <div className="absolute border border-[#333333] rounded-full h-[500px] w-[500px] mt-52 animate-ping" />
      <div className="absolute border border-[#F7AB0A] rounded-full h-[650px] w-[650px] mt-52 animate-pulse" />{/* 천천히 깜빡이는 효과  */}
      <div className="absolute border border-[#333333] rounded-full h-[800px] w-[800px] mt-52 animate-ping" />
    </motion.div>
  )
}