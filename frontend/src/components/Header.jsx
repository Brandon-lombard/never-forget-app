import React from 'react'

// Css 
import "./header.css"

export default function Header() {
  return (
    <div className="headerContainer">

        <div className="appNameCon">

          {/* App name */}
            <h1 className="appName">Never Forget</h1>

        </div>
        
        <div className="infoTextCon">

          {/* Short description of app */}
            <p className="infoText">Never forget is the perfect way to search and store your favorite content from itunes.</p>

        </div>
    </div>
  )
}
