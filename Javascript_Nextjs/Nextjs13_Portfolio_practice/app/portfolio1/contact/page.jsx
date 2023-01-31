'use client'
import React, { useEffect, useState, useRef } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import emailjs from '@emailjs/browser'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map'), { ssr: false }) // Import witout SSR // To prevent from Error "window is not defined"

export default function page() {
  const [letterClass, setLetterClass] = useState('text-animate')
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
  }, [])

  const form = useRef()

  // 이메일 보내기
  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert('Your Message successfully sent!')
          window.location.reload(false)
        },
        (error) => {
          alert('Failed to send the massage, please try again')
        }
      )
  }

  return (
    <>
    {/* 애니메이션 하나씩 문자 및 설명 */}
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"Contact me".split("")}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially on ambitious
            or large projects. However, if you have any other requests or
            questions, don't hesitate to contact me using below form either.
          </p>
          {/* 이메일 폼 */}
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        {/* 지도 위 info */}
        <div className="info-map">
          John Park(Yeonghwan Park)
          <br />
          Living in Pasadena Tx US,
          <br />
          Born from S.Korea
          <br />
          <span>vyckd354@gmail.com</span>
        </div>
        <div className="map-wrap">
          <Map />
        </div>
      </div>
      <Loader type="ball-grid-pulse" />
    </>
  )
}
