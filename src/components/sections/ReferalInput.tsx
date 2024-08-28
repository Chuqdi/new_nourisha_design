import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

function ReferalInput() {
  return (
    <div className="w-full flex gap-3 mt-4">
    <div className="w-[70%] relative">
    <input
       type="text"
       readOnly
       value="REF23JHR"
       className="bg-white rounded-[0.5rem] w-full h-[3rem] p-3"
     />
     <p className="absolute right-[0.6rem] top-[0.8rem] text-sm font-bold font-inter text-[#303237]">Copy</p>
    </div>
     <button className="flex items-center bg-primary-orange-900 justify-center rounded-[0.5rem] text-white font-inter w-[30%]">
       <Icon color="#fff" className="w-6 h-6" icon="tabler:send" />
       Share
     </button>
   </div>
  )
}

export default ReferalInput
