import React from "react";
import { motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: 200,
        opacity: 1,
        transition: { delay: 0.5 }
    }
}

export default function Modal({ showModal, setShowModal, setToWhere }) {
  return (
    <>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <p>Want to make another pizza?</p>
            <button
              onClick={() => {
                setToWhere("");
              }}
            >
              Start Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
