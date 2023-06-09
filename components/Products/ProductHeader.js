import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../stores/authContext'

const ProductHeader = () => {
  const {user} = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(user?.app_metadata.roles[0])
  }, [user])

  return (
    <div className={`cursor-loading mt-6 mb-3 grid ${role !== 'admin' ? 'grid-cols-[2fr_1fr_1fr_1fr]' : 'grid-cols-[2fr_1fr_1fr_0.1fr_0.5fr]'} rounded-md border px-5 py-3 shadow-sm lg:px-8`}>
      <div className="flex-1 font-semibold">Title</div>
      <div className="flex-1 text-right font-semibold lg:text-left">
        Brand
      </div>
      <div className="flex-1 text-right font-semibold lg:text-left">
        Product Type
      </div>
      {role !== 'admin' && (
      <div className="flex-1 text-right font-semibold lg:text-left">
        RFID
      </div>
      )
          }
    </div>
  )
}

export default ProductHeader
