'use client'
import Loader from 'react-loaders'
import AnimatedLetters from './../AnimatedLetters';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import portfolioData from '../../../portfolio.json'

export default function page() {
const [letterClass, setLetterClass] = useState('text-animate');

useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
  }, [])

// json데이터로 포트폴리오 박스 생성
  const renderPortfolio = (portfolio) => {
    return (
        <div className='images-container'>
            {
                portfolio?.map((port, idx)=> {
                    return(
                        <div className='image-box' key={idx}>
                            <Image width={400} height={400} className='portfolio-image' src={port.cover} alt="portfolio" />
                            <div className='content'>
                                <p className='title'>{port.title}</p>
                                <h4 className='description'>{port.description}</h4>
                                <button className='btn' onClick={()=>window.open(port.url)}>View</button>
                            </div>
                        </div>
                    )
                }) 
            }
        </div>
    )
  }

return (<>
    <div className='container portfolio-page'>
        <h1 className='page-title'>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"portfolio".split("")}
            idx={15}
          />
        </h1>
        <div>{renderPortfolio(portfolioData.portfolio)}</div>
    </div>
        <Loader type="square-spin" />
    </>)
}
