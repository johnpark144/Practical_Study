'use client'
import Hero from './Hero';
import WorkExperience from './WorkExperience';
import Projects from './Projects';
import ContactMe from './ContactMe';

export default function page() {
  return (
    <div className='bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory 
    overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 '>
      {/* Hero */}
      <section id="hero" className='snap-start'> {/* snap-start', snap-center는 스크롤이 정착되게함 */}
        <Hero />
      </section>
      {/* Experience */}
      <section id='experience' className='snap-center'>
        <WorkExperience />
      </section>
      {/* Projects */}
      <section id='projects' className='snap-start'>
        <Projects />
      </section>
      {/* Contact Me */}
      <section id='contactMe' className='snap-start'>
        <ContactMe />
      </section>

    </div>
  )
}
