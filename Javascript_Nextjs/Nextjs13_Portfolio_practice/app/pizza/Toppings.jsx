'use client'
import React from 'react'
import { motion, spring } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { // transition을 따로 지정 하지않고 이와같이 variants를 이용 할수 있음
      type: "spring", delay: 0.5 
    }
  },
  exit: {
    x: '-100vw',
    transition: { ease: "easeInOut" }
  }
}

const buttonVariants = {
  visible: {
    x: -20,
    transition: { delay: 2, repeat: 10, repeatType: 'reverse'  },
  },
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      repeat: Infinity, // 반복 횟수
      repeatType: 'reverse' // 반복 방식
    },
  },
};


export default function Toppings({ setToWhere, addTopping, pizza }) {
    let toppings = ['mushrooms', 'peppers', 'onions', 'olives', 'extra cheese', 'tomatoes']

  return (
    <motion.div className="toppings container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Step 2: Choose Toppings</h3>
      <ul>
        {toppings.map((topping) => {
          let spanClass = pizza.toppings.includes(topping) ? "active" : "";
          return (
            <motion.li
              key={topping}
              onClick={() => addTopping(topping)}
              whileHover={{ scale: 1.3, originX: 0, color: "#f83112" }}
              transition={{ type:'spring', stiffness: 300 }}
            >
              <span className={spanClass}>{topping}</span>
            </motion.li>
          );
        })}
      </ul>
      <motion.button
        variants={buttonVariants} whileHover="gover"
        onClick={() => setToWhere("order")}
      >
        order
      </motion.button>
    </motion.div>
  );
}
