"use client";
import Image from 'next/image';
import LogoTitle from '../../public/logo-s.png'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimatedLetters from './AnimatedLetters';
import Logo from './Logo';
import Loader from 'react-loaders';

export default function page() {
    const [letterClass, setLetterClass] = useState('text-animate');
    const jobArray = ['u','p','e','r',' ','C','o','o','l',' ','w','e','b','-','d','e','v','e','l','o','p','e','r']
    const nameArray = ['J','o','h','n',' ','P','a','r','k']

    useEffect(() => {
      setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 4000)
    }, [])

    return (<>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I'</span>
            <span className={`${letterClass} _14`}>m</span>

            <Image src={LogoTitle} alt="developer" />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={38}
            />
          </h1>
          <h2>Front End developer</h2>
          <Link href="/portfolio1/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
        <Logo />
      </div>
    <Loader type="pacman" />
    </>)
}
