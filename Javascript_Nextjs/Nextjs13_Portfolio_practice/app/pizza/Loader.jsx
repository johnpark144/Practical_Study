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
        x: 0,
        y: [0, -40],
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
