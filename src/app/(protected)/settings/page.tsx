import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'

function Settings() {
  return (
    <div>
            <main className="max-w-290 w-full mx-auto px-6">
              <div className="pt-10 w-full">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                    Settings
                  </h1>
                  <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                    Your Subscription Plan
                    <p className='font-normal flex items-center gap-2 '>Premium <BsFillStarFill color='gold'/> </p>
                  </div>
                  <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                    Email
                    <p className='font-normal'>vic@gmail.com</p>
                  </div>
                </div>
              </div>
            </main>
    </div>
  )
}

export default Settings
