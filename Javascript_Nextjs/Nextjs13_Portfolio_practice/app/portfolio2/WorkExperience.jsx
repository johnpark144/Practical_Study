'use client'
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import HorizontalScroll from 'react-scroll-horizontal';

export default function WorkExperience() {
  return (
    
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className='h-screen relative overflow-hidden flex flex-col
     text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
        Experience
      </h3>
      <HorizontalScroll reverseScroll={true} className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory
      scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </HorizontalScroll>
    </motion.div>
  )
}
