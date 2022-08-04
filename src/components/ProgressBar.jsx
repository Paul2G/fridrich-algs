import React, { Component } from 'react'

import "../assets/progressbar.css"

export class ProgressBar extends Component {
  render() {
    return (
        <div className="progress-bar">
            <div className="learned" style={{width: this.props.learned+"%", display: this.props.learned===0 ? "none" : "inline"}}/>
            <div className="relearn" style={{width: this.props.relearn+"%", display: this.props.relearn===0 ? "none" : "inline"}}/>
            <div className="practicing" style={{width: this.props.practicing+"%", display: this.props.practicing===0 ? "none" : "inline"}}/>
        </div>
    )
  }
}

export default ProgressBar