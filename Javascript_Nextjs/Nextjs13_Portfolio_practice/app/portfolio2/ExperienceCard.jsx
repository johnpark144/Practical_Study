import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiDjango, SiJavascript, SiReact, SiPython } from 'react-icons/si'

export default function ExperienceCard() {
  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] 
    md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 
    cursor-pointer transion-opacity duration-200 overflow-hidden '>
        {/* 이미지 */}
      <motion.div
        initial={{
            y: -100,
            opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once:true }}
      >
        <Image
          className="w-32 h-32 xl:w-[200px] xl:h-[200px] relative rounded-full mx-auto object-cover object-center"
          width={200}
          height={200}
          src="https://avatars.githubusercontent.com/u/106279616?v=4"
          alt="profilel_image"
        />
      </motion.div>
      {/* 경험 */}
      <div className='px-0 md:px-10'>
        <h4 className="font-bold text-2xl mt-1">CEO of something</h4>
        <p className='flex space-x-2 my-2'>somthing</p>
        <div className='flex space-x-2 my-2'>
            <SiJavascript color='#c4b92a' />
            <SiPython color='#412ac4'  />
            <SiReact color='#2aa5c4'  />
            <SiDjango color='#13ad34'  />
        </div>
        <p>Started work... - Ended...</p>

        <ul className='list-disc space-y-4 ml-5 text-lg'>
            <li>summary part</li>
            <li>summary part</li>
            <li>summary part</li>
            <li>summary part</li>
            <li>summary part</li>
        </ul>
      </div>
    </article>
  )
}
