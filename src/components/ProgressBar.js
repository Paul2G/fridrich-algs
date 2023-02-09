import React from 'react'

import "../assets/css/progressbar.css"

export default function ProgressBar(props) {
  return (
      <div className="progress-bar">
          <div className="learned" style={{width: props.learned+"%", opacity: props.learned===0 ? "0" : "1", transition: "200ms"}}/>
          <div className="relearn" style={{width: props.relearn+"%", opacity: props.relearn===0 ? "0" : "1", transition: "200ms"}}/>
          <div className="practicing" style={{width: props.practicing+"%", opacity: props.practicing===0 ? "0" : "1", transition: "200ms"}}/>
      </div>
  )
}