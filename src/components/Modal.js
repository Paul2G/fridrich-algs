import React, { useContext } from 'react'
import "../assets/css/modal.css";
import GlobalContext from '../behaviour/ModalContext';

export default function Modal(props){
    const context = useContext(GlobalContext);

    return (
        <div className="modal-container" id={props.id}>
            <div className="modal">
                <button type="button" className="close-btn" onClick={() => context.closeModal()} />
                <div className="modal-content">

                    {props.children}

                </div>
            </div>
        </div> 
    )
}
