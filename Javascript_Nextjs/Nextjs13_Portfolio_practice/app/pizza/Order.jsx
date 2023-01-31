'use client'
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { // 이름 자유롭게 변경가능
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {// transition을 따로 지정 하지않고 이와같이 variants를 이용 할수 있음
      type: "spring",
      mass: 0.4,  // 질량 (크면클수록 무거워진느낌)
      damping: 8, // 숫자가 크면 제동이 줄어듬(더 미끌려나감)
      delayChildren: 0.4, // 첫 자식 컴포넌트에 0.4초 딜레이 부여
      staggerChildren: 0.4,  //  자식 컴포넌트 하나 나타나고 그다음 컴포넌트에 0.4초 딜레이 부여
      when: "beforeChildren", // beforeChildren는 Children들중 애니메이션이 있는경우 이게 먼저 발생한 뒤 Children 애니메이션 발생
    },
  },
  exit: {
    x: '-100vw',
    transition: { ease: "easeInOut" }
  }
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  }
}
export default function Order({ pizza, setShowModal }) {
  
  useEffect(() => {
    setTimeout(()=>{
      setShowModal(true)
    }, 5000)
  }, [setShowModal]);

  return (
    <motion.div
      className="container order"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Thank you for order !</h2>
      <motion.p variants={childVariants}>
        You ordered a {pizza.base} pizza with:
      </motion.p>
      <motion.div variants={childVariants}>
        {pizza.toppings.map((topping) => (
          <div key={topping}>{topping}</div>
        ))}
      </motion.div>
    </motion.div>
  );
}


