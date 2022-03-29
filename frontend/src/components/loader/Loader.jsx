import React from 'react'

// css
import "./loader.css"

export default function Loader() {
  return (
    <div>

      {/* Loader container */}
        <div className="loaderContainer">

        {/* Each child circle */}
            <div className="circle "></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            
        </div>

    </div>
  )
}
