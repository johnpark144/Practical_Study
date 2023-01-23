// https://www.framer.com/motion/   // 효과 참고 웹사이트
// npm i framer-motion


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

// ##### Varients (변형) ############################################################################################################################
const containerVariants = {
  hidden: { // 이름 자유롭게 변경가능
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { // transition을 따로 지정 하지않고 이와같이 variants를 이용 할수 있음
      type: "spring", delay: 0.5 
    }
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
   </motion.div>

   <motion.div
       className="next"
       variants={nextVariants} // 한번 위에  initial="hidden"와 animate="visible"를 사용해서 비록 다른Varients지만 initial과 animate을 적어둘 필요X
       onClick={() => setToWhere("toppings")}
     >
    </motion.div>
// #####  () ############################################################################################################################
