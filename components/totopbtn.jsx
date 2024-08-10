"use client";

import { DoubleArrowUpIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react";

export default function ToTopBtn() {
  const [visible, setVisible] = useState(false) 
  const [scrollTop, setScrollTop] = useState("")
  useEffect(() => {
   const handleScroll = event => {
      if (event.currentTarget.scrollY > 200){ 
        setVisible(true) 
      }  
      else if (event.currentTarget.scrollY <= 200){ 
        setVisible(false) 
      } 

    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
    
  }, [])


  return (
			<div className={`sticky top-[90dvh] left-[100dvw] block h-12 w-12 z-20 -mr-20 max-md:-mr-8 max-sm:-mr-16 max-ssm:mr-0
         bg-white rounded-full opacity-50 ${visible? "max-2xl:visible invisible": "invisible"}`}>
        <button className="h-full w-full block px-2 opacity-100" onClick={(e) => {
          e.preventDefault()
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }}>
          <DoubleArrowUpIcon width={30} height={30}></DoubleArrowUpIcon>
        </button>
			</div>
  )
};
