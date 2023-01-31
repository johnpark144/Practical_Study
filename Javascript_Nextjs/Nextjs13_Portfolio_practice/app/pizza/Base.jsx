"use client";
import React from "react";
import { motion } from "framer-motion";

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

const nextVariants = {
  hidden: {
    x: '-100vw'
  },
  visible: {
    x: 0,
    transition: {
      type: "spring", stiffness: 120
    }
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

export default function Base({ setToWhere, addBase, pizza }) {
  const bases = ["Classic", "Thin & Crispy", "Thick Crust"];
  return (
    <motion.div
      className="base container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Step 1 : Choose your base</h3>
      <ul>
        {bases.map((base) => {
          let spanClass = pizza.base === base ? "active" : "";
          return (
            <motion.li
              key={base}
              onClick={() => addBase(base)}
              whileHover={{ scale: 1.3, originX: 0, color: "#f83112" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={spanClass}>{base}</span>
            </motion.li>
          );
        })}
      </ul>

      {pizza.base && (
        <motion.div
          className="next"
          variants={nextVariants}
          onClick={() => setToWhere("toppings")}
        >
          <motion.button variants={buttonVariants} whileHover="gover">Next</motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
