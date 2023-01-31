'use client'
import React from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa'
import { SiDjango, SiTypescript, SiJavascript, SiPython } from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
import Loader from 'react-loaders';

export default function page() {
const [letterClass, setLetterClass] = useState('text-animate');

useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
  }, [])

  return (<>
    <div className="container about-page">
      <div className="text-zone">
    {/* 애니메이션 하나씩 문자 및 설명 */}
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"About me".split("")}
            idx={15}
          />
        </h1>
        <p>
          I'm a very ambitious front-end developer looking for a role in an
          established IT company with the opportunity to work with the latest
          technologies on challenging and diverse projects.
        </p>
        <p align="LEFT">
          I'm quiet confident, naturally curious, and perpetually working on
          improving my chops one design problem at a time.
        </p>
        <p>
          If I need to define myself in one sentence that would be a family
          person, father of a beautiful daughter, a sports fanatic, photography
          enthusiast, and tech-obsessed!!!
        </p>
      </div>

      {/* 큐브 애니메이션 */}
      <div className='stage-cube-cont'>
        <div className='cubespinner'>
            <div className='face1'>
                <FaReact />
            </div>
            <div className='face2'>
                <SiDjango />
            </div>
            <div className='face3'>
                <TbBrandNextjs />
            </div>
            <div className='face4'>
                <SiTypescript />
            </div>
            <div className='face5'>
                <SiJavascript />
            </div>
            <div className='face6'>
                <SiPython />
            </div>
        </div>
      </div>
    </div>
    <Loader type="cube-transition" />
    </>)
}
