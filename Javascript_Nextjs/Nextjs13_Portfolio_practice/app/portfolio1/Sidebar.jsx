'use client'
import React from 'react'
import Link from 'next/link'
import LogoS from '../../public/logo-s.png'
import LogoSubtitle from '../../public/logo_sub.png'
import Image from 'next/image'
import { AiFillHome } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { FaSuitcase } from 'react-icons/fa'
import { usePathname } from 'next/navigation';

export default function page() {
    const pathname = usePathname();

  return (
    <div className='nav-bar'>
        <Link href="/portfolio1" className='logo'>
            <Image src={LogoS} alt="logo" />
            <Image className='sub-log' src={LogoSubtitle} alt="slobodan" />
        </Link>
        <nav>
            <Link href="/portfolio1" className={`${pathname === "/portfolio1" ? "active" : ""}`}>
                <AiFillHome />
            </Link>
            <Link href="/portfolio1/about" className={`about-link ${pathname === "/portfolio1/about" ? "active" : ""}`}>
                <BsFillPersonFill />
            </Link>
            <Link href="/portfolio1/portfolio" className={`portfolio-link ${pathname === "/portfolio1/portfolio" ? "active" : ""}`}>
                <FaSuitcase />
            </Link>
            <Link href="/portfolio1/contact" className={`contact-link ${pathname === "/portfolio1/contact" ? "active" : ""}`}>
                <IoMdMail />
            </Link>
        </nav>
        <ul>
            <li>
                <a target='_blank' rel="noreferrer" href="https://github.com/johnpark144">
                    <AiFillGithub color='#4d4d4e' />
                </a>
            </li>
            <li>
                <a target='_blank' rel="noreferrer" href="https://www.facebook.com/">
                    <AiFillFacebook color='#4d4d4e' />
                </a>
            </li>
        </ul>
    </div>
  )
}
