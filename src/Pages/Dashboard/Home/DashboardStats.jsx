import React from 'react'
import TinyChart from './TinyChart'

export const DashboardStats = ({ label, value, percent, color, icon }) => {
    
  return (
    <div className={`flex w-full items-center justify-evenly h-24 rounded-xl bg-white gap-10 px-3`}>
      <div className="h-[80%] py-1.5 flex flex-col items-start justify-between">
        <p className='mb-2'>{label}</p>
        <p className="text-[24px] font-bold">{value}</p>
        {percent > 0 ? (
          <p>
            <span className="text-green-400 flex gap-2">
              {icon[0]} {Number(percent).toFixed(2)}% last 7 days
            </span>
          </p>
        ) : (
          <p>
            <span className="text-red-400 flex gap-2 whitespace-nowrap">
              {icon[1]} {Number(percent).toFixed(2)}% last 7 days
            </span>
          </p>
        )}
      </div>
      <div className="h-[60%] flex items-center justify-end w-20 ">
        <TinyChart color={color} />
      </div>
    </div>

  )
}
