import React from 'react'
import earthBg from "../../public/EarthBg.jpeg"
import LightRays from './LightRays'
const Hero = () => {
  return (
    <div className='w-full h-[100dvh] bg-cover relative  overflow-hidden'>
        <div style={{ width: '100%', height: '100%', position: 'absolute' }} className=''>
            <LightRays
                raysOrigin="top-center"
                raysColor="#8700E0"
                raysSpeed={1}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays bg-transparent"
            />
        </div>
        <div className='bg-cover scale-125 mr-8 '>
            <img src={earthBg} alt="" className=''/>
            
        </div>
        <div className='bg-[black]/25 inset-0 absolute'></div>
        <div className='absolute inset-0 flex flex-col justify-start items-center pt-[130px]'>
            <h1 className="text-7xl font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent ">
            Bharat Netra
            </h1>
            <p className='text-xl w-[700px] text-center mt-3'>BharatNetra is the digital eye of law enforcement, empowering agencies with speed, precision, and intelligence.</p>
        </div>
    </div>
  )
}

export default Hero