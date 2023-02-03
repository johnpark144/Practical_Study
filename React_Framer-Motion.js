// https://www.framer.com/motion/   // 효과 참고 웹사이트
// npm i framer-motion

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
  viewport={{ once: true }} // 애니메이션 한번만 나오게
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
      delayChildren: 0.4, // 첫 자식 컴포넌트에 0.4초 딜레이 부여
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
       variants={nextVariants} // 부모요소에  initial="hidden"와 animate="visible"를 사용해서 디폴트가되어, 비록 다른Varients지만 initial과 animate을 스킵 가능
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
    {/* AnimatePresence안 태그들이 사라질떄 애니메이션 효과를 줄수있음 // mode="wait"  새로운 컴포넌트가 나타나기 전에 이전 컴포넌트가 사라지게함  // onExitComplete는 exit될때 자동으로 실행 */}
   <AnimatePresence mode="wait"  onExitComplete={() => setShowModal(false)}>
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

// ##### Animating SVG (그림 그리기) ###########################################################################################################
const svgVariants = {
  hidden: { rotate: -180, opacity: 0 },   // 180도 돌아있다
  visible: {
    rotate: 0,                            // 180도 돌아 제자리로
    opacity: 1,
    transition: { duration: 1 }
  }
}
const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0    // 0이면 path를 하나도 그리지않음
  },
  visible: {
    opacity: 1,
    pathLength: 1,   // svg 안에 motion.path에 d로되있는 path를 순차례로 그려줌
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
}

export default function page() {
   return (
   <div className="logo">
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
           d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z" // path를 그려지는 순서
           variants={pathVariants}
         />
         <motion.path
           fill="none"
           d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z" // path를 그려지는 순서
           variants={pathVariants}
         />
       </motion.svg>
   </div>
   )
}

// ##### Loader와 useCycle (반복적인 두 로더만들기) ##############################################################################################################
import { motion, useCycle } from "framer-motion";

const loaderVariants = {
    animation1: {
        x: [-30, 30],
        y: [0, -60],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1
            },
            y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    },
    animation2: {
        x: [0, -40],
        y: 0,
        transition: {
            y: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    }
}

export default function Loader() {
    const [animation, cycleAnimation] = useCycle("animation1", "animation2");
  return (
    <>
    <motion.div className="loader" variants={loaderVariants} animate={animation} /> {/* 토글 변경된 animation */}
    <div onClick={()=>cycleAnimation()}>Cycle Loader</div>    {/* 클릭시 토글 */}
    </>
  )
}


// ##### Dragging item  ( ) #########################################################################################################################
<motion.div className="logo"
    drag    // 드래그 가능하게 만듬
    dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }} // 이 이상 드래그 된경우 이자리로 돌아옴
    dragElastic={0.5} // 드래그할떄 뻣뻣한 정도  (디폴트 1 // 숫자가 낮으면 뻣뻣해짐)
   >
</motion.div>

// ##### useScroll  (스크롤에 따른 그림 그리기) #######################################################################################################
"use client"
import React, { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import '../styles/portfolio2.css'

export default function LineWithScroll() {
    const { scrollY } = useScroll()
    const [currentPath, setCurrentPath] = useState(0)

    useMotionValueEvent(scrollY, 'change', (latest) => {
        // 현재 스크롤 위치 / (전체 스크롤 높이 - 윈도우창의 높이 )
        setCurrentPath(latest/(document.body.scrollHeight-window.innerHeight))
    })

  return (
    <svg
      width="116"
      height="701"
      viewBox="0 0 116 701"
      fill="none"
      className='fixed top-0 w-full h-full'
    >
      <motion.path
        d="M35.3147 0L41.9981 210.518C34.2309 207.163 18.6965 203.305 18.6965 214.712C18.6965 226.118 25.8014 225.279 29.3538 223.434C27.7883 228.131 26.7888 237.659 35.3147 238.196C43.8406 238.733 60.1819 238.419 67.2868 238.196C67.2868 235.68 64.7579 230.547 54.6425 230.144C44.527 229.741 62.3495 235.344 72.5251 238.196H87.1564C91.5095 234.449 96.6644 227.594 82.46 230.144C68.2555 232.694 87.6203 233.667 99.0782 233.834C105.701 230.591 115.769 221.388 103.052 210.518C90.3356 199.648 80.5332 192.346 77.2216 190.053C74.0906 190.613 68.768 193.61 72.5251 201.124C76.2823 208.639 80.7138 207.611 82.46 206.157L77.2216 214.712H41.9981L46.6946 542.482C42.9013 544.104 35.3147 549.326 35.3147 557.244C35.3147 565.161 21.1049 560.543 14 557.244L25.3799 573.85L18.6965 583.076L41.9981 586.263V577.038C43.8045 578.1 51.3911 579.587 67.2868 577.038C83.1825 574.488 77.4022 582.126 72.5251 586.263H95.1043L87.1564 573.85H111V564.625C111 562.164 109.41 557.244 103.052 557.244C96.6939 557.244 86.6747 557.244 82.46 557.244C82.9416 552.1 78.0525 541.073 54.6425 538.121C31.2324 535.169 28.0292 557.02 29.3538 568.315C35.0739 572.285 53.7032 579.587 82.46 577.038C111.217 574.488 97.5729 567.7 87.1564 564.625V701"
        stroke="#892525"
        strokeWidth="5"
        initial={{ pathLength : 0 }}
        animate={{ pathLength : currentPath }}
      />
    </svg>
  )
}
