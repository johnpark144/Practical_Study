'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import portfolioData from '../../portfolio.json'
import HorizontalScroll from 'react-scroll-horizontal';

export default function Projects() {

  return (
    <div className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>
      {/* Json파일에서 불러와서 데이터 풀기 */}
      <HorizontalScroll reverseScroll={true} className="z-20 snap-x snap-mandatory">
          {portfolioData?.portfolio.map((project, idx) => (
            <div
              className="w-screen flex-shrink-0 snap-start flex flex-col space-y-5 items-center 
            justify-center p-20 md:p-44 h-screen rounded-xl"
              key={project.title}
            >
              <motion.div
                initial={{
                  y: -300,
                  opacity: 0,
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Image
                  width={400}
                  height={400}
                  src={project.cover}
                  alt="project_image"
                />
              </motion.div>
              <div className="space-y-10 px-0 md:px-10 max-w-6">
                <h4 className="text-4xl font-semibold text-center">
                  <span className="underline decoration-[#f7ab0a]/50">
                    Case study {idx + 1} of {portfolioData.length} :
                  </span>
                  {project.title}
                </h4>
                <p className="text-lg text-center md:text-left">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      {/* 대각선 효과 -skew-y transform: skewY(-12deg)*/}
      <div className="w-full absolute top-[30%] bg-[#f7ab0a]/10 left-0 h-[500px] -skew-y-12" />{' '}
    </div>
  )
}
