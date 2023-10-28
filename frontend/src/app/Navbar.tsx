'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {

  useEffect( () => {
    let menuBtn = document.getElementById('drop-btn')
    if (menuBtn == null) return
    menuBtn.addEventListener('click', toggleDrop)

    return () => {
      let menuBtn = document.getElementById('drop-btn')
      if (menuBtn == null) return
      menuBtn.removeEventListener('click', toggleDrop)
    }
  }, [])

  function toggleDrop() {
    document.getElementById('btn-svg')?.classList.toggle('rotate-180')
    let menu = document.getElementById("dropdown")
    if (menu == null) return
    menu.classList.toggle('h-0')
    menu.classList.toggle('h-64')
  }

  function close( e : any ) {
    e.currentTarget.parentElement?.classList.toggle('h-0')
    e.currentTarget.parentElement?.classList.toggle('h-64')
  }

  return (
    <div>
      <div id='navbar' className="fixed z-50 w-full text-mint-cream text-2xl font-bold
          h-20 items-center text-center flex px-0 shadow-md bg-gray-50">
        <div className="flex flex-col ml-16">
          <Link href='/' className="flex flex-row items-center justify-center hover:text-gray-600">
            {/*
            <svg className="drop-shadow-lg" width="100" height="40" viewBox="0 0 211 109" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M30.6349 54.5L54 109H25.7333H23.3651L1.14441e-05 54.5L23.3651 0L25.7333 0L54 0L30.6349 54.5Z" fill="white"/>
              <path id="Subtract_2" fillRule="evenodd" clipRule="evenodd" d="M180.365 54.5L157 109H185.267H187.635L211 54.5L187.635 0L185.267 0L157 0L180.365 54.5Z" fill="white"/>
              <path id="L" d="M113.768 86C107.176 86 102.376 85.968 99.368 85.904C96.616 85.904 94.504 85.872 93.032 85.808L85.16 85.712C84.584 85.712 84.04 85.456 83.528 84.944C83.016 84.432 82.76 83.888 82.76 83.312V62.192V52.976L82.664 45.104C82.664 42.48 82.728 39.184 82.856 35.216C82.856 34.384 82.952 32.24 83.144 28.784V26.576C83.144 24.784 83.496 23.344 84.2 22.256C84.52 21.68 85.032 21.392 85.736 21.392C88.872 21.392 92.296 21.456 96.008 21.584C96.52 21.648 97.256 21.68 98.216 21.68C100.328 21.68 101.896 21.712 102.92 21.776H108.104C108.36 21.776 109.096 21.776 110.312 21.776C111.592 21.776 112.584 21.936 113.288 22.256C114.44 22.896 115.016 24.368 115.016 26.672L114.92 27.44C114.92 27.632 114.856 28.112 114.728 28.88C114.536 29.84 114.44 30.544 114.44 30.992C114.44 31.696 114.536 32.592 114.728 33.68C114.856 34.448 114.92 34.96 114.92 35.216L115.016 35.792V49.232V55.472V61.424V62.576C115.016 63.088 115.304 63.408 115.88 63.536C116.072 63.6 116.488 63.632 117.128 63.632H124.136C125.864 63.568 128.488 63.536 132.008 63.536C132.712 63.536 133.288 63.76 133.736 64.208C134.184 64.592 134.408 65.008 134.408 65.456V83.792V83.984C134.408 84.496 134.152 84.912 133.64 85.232C133.064 85.488 132.392 85.648 131.624 85.712C130.792 85.904 129.48 86 127.688 86H113.768Z" fill="white"/>
            </svg>
            */}
            <svg width="60" height="60" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="120.5" cy="134" rx="71.5" ry="71" fill="black"/>
              <path d="M116.21 49.5721L161.97 34.674" stroke="black" stroke-width="12"/>
              <defs>
              <filter id="filter0_d_0_1" x="0" y="0" width="240" height="240" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
              </filter>
              </defs>
            </svg>
            <p className="ml-4 hidden md:block">Grocery App</p>
          </Link>
        </div>

        <div id="space" className="text-left ml-0 mr-auto align-right"></div>
        <div id="otherlinks" className="hidden md:block mr-32">
          <Link href='/dashboard' className="ml-16 hover:text-gray-600">Dashboard</Link>
          <Link href='/login' className="ml-16 text-green-400 hover:text-green-300">Login</Link>
        </div>
        <div id="drop-btn" className="duration-100 hover:drop-shadow-nav md:hidden flex flex-col items-center justify-center text-white mx-10 px-2" >
          <svg id="btn-svg" className="duration-300 ease-in-out" width="30" height="30" viewBox="0 0 184 89" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M92 39L184 0.865234V50.8652L92 89L0 50.8652V0.865234L92 39Z" fill="#ffffff"/>
          </svg>
        </div>

      </div>
    </div>
  )
}
