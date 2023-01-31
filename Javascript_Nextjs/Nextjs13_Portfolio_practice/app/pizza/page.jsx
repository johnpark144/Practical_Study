"use client";
import React, { useState } from "react";
import Base from "./Base";
import Toppings from "./Toppings";
import Order from "./Order";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Loader from "./Loader";

const buttonVariants = {
  visible: {
    x: -20,
    transition: { delay: 2, repeat: 5, repeatType: "reverse" },
  },
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.5,
      repeat: Infinity, // 반복 횟수
      repeatType: "reverse", // 반복 방식
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const svgVariants = {
  hidden: { rotate: -180, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 1 }
  }
}

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
}

export default function page() {
  const [pizza, setpizza] = useState({ base: "", toppings: [] });
  const [toWhere, setToWhere] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addBase = (base) => {
    setpizza({ ...pizza, base });
  };

  const addTopping = (topping) => {
    let newToppings;
    if (!pizza.toppings.includes(topping)) {
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter((item) => item !== topping);
    }
    setpizza({ ...pizza, toppings: newToppings });
  };

  return (
    <>
      {/* Header */}
      <header>
        <motion.div className="logo"
          drag
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }} // 이 이상 드래그 된경우 이자리로 돌아옴
          dragElastic={0.5} // 드래그할떄 뻣뻣한 정도  (디폴트 1 // 숫자가 낮으면 뻣뻣해짐)
        >
          <motion.svg
            className="pizza-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.path
              fill="none"
              d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
              variants={pathVariants}
            />
            <motion.path
              fill="none"
              d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
              variants={pathVariants}
            />
          </motion.svg>
        </motion.div>
        <motion.div
          className="title"
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }} // 에니메이션 타입(spring은 바운스 효과, stiffness는 바운스강도 -> 100 디폴트)
        >
          <h1>Pizza joint</h1>
        </motion.div>
      </header>
      {/* Components */}
      {/* AnimatePresence안 태그들이 사라질떄 애니메이션 효과를 줄수있음 // mode="wait"  새로운 컴포넌트가 나타나기 전에 이전 컴포넌트가 사라지게함  // onExitComplete는 exit될때 자동으로 실행 */}
      <AnimatePresence mode="wait" onExitComplete={() => setShowModal(false)}>
        {toWhere === "base" ? (
          <Base
            setToWhere={setToWhere}
            addBase={addBase}
            pizza={pizza}
            key="base"
          />
        ) : toWhere === "toppings" ? (
          <Toppings
            setToWhere={setToWhere}
            addTopping={addTopping}
            pizza={pizza}
            key="toppings"
          />
        ) : toWhere === "order" ? (
          <Order pizza={pizza} key="order" setShowModal={setShowModal} />
        ) : (
          // Home
          <motion.div
            className="home container"
            key="home"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>welcome to Pizza Joint</h2>
            <motion.button
              onClick={() => setToWhere("base")}
              variants={buttonVariants}
              animate="visible"
              whileHover="hover"
            >
              create your pizza
            </motion.button>
            <Loader />
          </motion.div>
        )}
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          setToWhere={setToWhere}
        />
      </AnimatePresence>
    </>
  );
}
