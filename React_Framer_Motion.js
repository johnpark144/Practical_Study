// https://www.framer.com/motion/   // 효과 참고 웹사이트
// npm i framer-motion

// npm install uuid // uuid 고유키 생성하기위해
// https://velog.io/@forest0501/Framer-Motion%EC%9D%84-%EC%98%A4%EB%9E%9C%EB%A7%8C%EC%97%90-%EC%93%B8-%EB%95%8C-%EB%B3%B4%EB%8A%94-%EA%B0%84%EB%8B%A8%ED%95%9C-%ED%8F%AC%EC%8A%A4%ED%8A%B8


// ##### Animate (에니메이션 효과) ###############################################################################################################
import { motion } from 'framer-motion';

return(
   <motion.div className='home container'
      animate={{ rotateZ:180, opacity:0.2, marginTop: 200 }} // motion.태그 는 animate 안에 CSS요소를 애니메이션 효과로 빠꿔줌
    >
      <motion.h2 animate={{ fontSize: 50, color: '#ff2994', x: 100, y: -100 }}> {/* 픽셀단위가 디폴트 */}
        welcome to Pizza Joint
      </motion.h2>

      <motion.button onClick={()=>setToWhere("base")}
      animate={{ scale: 1.5 }} >
        create your pizza
      </motion.button>
    </motion.div>
    )}
)

// ##### Initial (시작점) ##################################################################################################################
<motion.div className='title' initial={{ y: -250 }} animate={{ y: -10 }}>
  <h1>Pizza joint</h1>
</motion.div>

<motion.div className='home container'
  initial={{ opacity: 0 }} // 시작점
  animate={{ opacity: 1 }} // motion.태그 는 animate 안에 CSS요소를 애니메이션 효과로 빠꿔줌
>
  <h2>
    welcome to Pizza Joint
  </h2>
  <motion.button onClick={()=>setToWhere("base")}
  animate={{  }} >
    create your pizza
  </motion.button>
</motion.div>

// ##### Transition Options (옵션) ##################################################################################################################
<motion.div className='home container'
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5, duration: 1.5 }} // 초단위가 디폴트
>
</motion.div>

<motion.div className='title'
   initial={{ y: -250 }}
   animate={{ y: -10 }}
   transition={{ delay: 0.2, type: "spring", stiffness: 200 }} // 에니메이션 타입(spring은 바운스 효과, stiffness는 바운스강도 -> 100 디폴트)
> 
  <h1>Pizza joint</h1>
</motion.div>

// ##### Hover (하버) ############################################################################################################################
 <motion.button
   onClick={() => setToWhere("base")}
   whileHover={{ // 하버가 될때 효과
     scale: 1.1, // 1이 디폴트
     textShadow: "0px 0px 8px rgb(255,255,255)",
     boxShadow: "0px 0px 8px rgb(255,255,255)",
   }}
 >
   create your pizza
 </motion.button>
<motion.li
  key={topping}
  onClick={() => addTopping(topping)}
  whileHover={{ scale: 1.3, originX: 0, color: "#f83112" }}  {/* originX는 scale효과에 X축이 움직이는 정도 (0이면 그자리) */}
  transition={{ type:'spring', stiffness: 300 }}  {/* Hover에도 transition이 먹힘 */}
>
  <span className={spanClass}>{topping}</span>
</motion.li>

// 기타 효과들 :
// whileHover
// : 커서가 컴포넌트 위로 이동하거나 떠날 때 동안의 애니메이션 속성.
// whileTap
// : 컴포넌트를 클릭하고 있는 동안의 애니메이션 속성
// whileFocus
// : 컴포넌트를 클릭해 포커스된 동안의 애니메이션 속성
// whileDrag
// : 끌기 제스쳐가 발생하는 동안의 애니메이션 속성
// whileInView
// : 보통 스크롤 할 때 사용, 내리면서 컴포넌트가 뷰포트에 있는 동안의 애니메이션 속성

// ##### Varients (변수나 상수 지정 사용) ################################################################################################################
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { // 이름 자유롭게 변경가능
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {// transition을 따로 지정 하지않고 이와같이 variants를 이용 할수 있음
      type: "spring",
      mass: 4,  // 질량 (크면클수록 무거워진느낌)
      damping: 8, // 숫자가 크면 제동이 줄어듬(더 미끌려나감)
      staggerChildren: 0.4,  //  자식 컴포넌트 하나 나타나고 그다음 컴포넌트에 0.4초 딜레이 부여
      when: "beforeChildren", // beforeChildren는 Children들중 애니메이션이 있는경우 이게 먼저 발생한 뒤 Children 애니메이션 발생
    },
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

function Base({ setToWhere, addBase, pizza }) {
  const bases = ["Classic", "Thin & Crispy", "Thick Crust"];
  return (
    <motion.div
      className="base container"
      variants={containerVariants}  // 위에 상수로 지정해둔것을 사용한다고 선언
      initial="hidden"  // 상수로 지정해준것 중 hidden의효과
      animate="visible" // 상수로 지정해준것 중 visible의효과
    >
   <motion.div
       className="next"
       variants={nextVariants} // 한번 위에  initial="hidden"와 animate="visible"를 사용해서 디폴트가되어, 비록 다른Varients지만 initial과 animate을 스킵 가능
       onClick={() => setToWhere("toppings")}
     >
    </motion.div>
   </motion.div>

// ##### Keyfrane (키프레임, 배열로인한 작동 순서) ################################################################################################################
const buttonVariants = {
  visible: {
    x: [0, -20, 20, -20, 20, 0], // 배열안에 있는 숫자 순서대로 실행됨 (animate)
    transition: { delay: 2 }
  },
  hover: {
    scale: [1,1.1,1,1.1,1,1.1,1],   // 배열안에 있는 숫자 순서대로 실행됨 (whileHover)
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
  }
}

export default function page() {
   return (
      <motion.button
         onClick={() => setToWhere("base")}
         variants={buttonVariants}
         animate="visible" // animate
         whileHover="hover" // whileHover
       >
         create your pizza
       </motion.button>
      )
}

// ##### Repeating (애니메이션 반복) #########################################################################################################################
const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      repeat: Infinity, // 반복 횟수 : 무한
      repeatType: 'reverse' // 반복 방식
    },
  },
};

export default function page() {
   return (
      <motion.button
         onClick={() => setToWhere("base")}
         variants={buttonVariants}
         animate="visible" // animate
         whileHover="hover" // whileHover
       >
         create your pizza
       </motion.button>
      )
}

// ##### AnimatePresence ( useState로 없애는 태그들, useLocation 으로 링크변경시에도 애니메이션 효과 가능 ) ################################################
'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

export default function Order({ pizza }) {
  const [showTitle, setShowTitle] = useState(true);
  setTimeout(()=>{
    setShowTitle(false)
  }, 4000)
   
return(
   <AnimatePresence exitBeforeEnter> {/* AnimatePresence안 태그들이 사라질떄 애니메이션 효과를 줄수있음 // exitBeforeEnter  새로운 컴포넌트가 나타나기 전에 이전 컴포넌트가 사라지게함 */}
     {showTitle && <motion.h2 key="msg" exit={{ y: -1000 }} >Thank you for order !</motion.h2>}  {/* key를 반드시 적어줘야함 // exit할때 효과 */}
   </AnimatePresence>
)

// const containerVariants = {
//   hidden: {
//     opacity: 0,
//   },
//   exit: {
//     x: '-100vw',
//     transition: { ease: "easeInOut" }
//   }
// }        // 이와같이 variants로도 사용가능

// ##### (  ) ######################################################################################
