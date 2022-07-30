import React, { Children } from 'react'

export class Modal extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {children} = this.props;

    return (
      <div className="modal-container" id="modal_container">
          <div className="modal">
              <button type="button" className="close-btn" onClick={this.props.func}/>
              <div className="modal-content">
                  {children}
              </div>
          </div>
      </div>
    )
  }
}

export default Modal;