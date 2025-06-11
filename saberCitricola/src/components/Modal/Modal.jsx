import React from "react"
import "./Modal.css"

const Modal = ({ isOpen, onClose, title, children, type, position, selectedId, minWidth, maxWidth, isCellPhone=false }) => {
    if (!isOpen) return null
    //console.log("POS X: ",posX)

    if (type === "ofTable" && !isCellPhone) {
        if (!selectedId) return null;

        const top = position.top;
        let left = position.left;
        if(left > 900) left = 800;
        
        return (
            <div className="my-modal-overlay-table" onClick={onClose}>
                <div className="my-modal-content-table" style={{ left: left + "px", top: top + "px" }} onClick={(e) => e.stopPropagation()}>
                    <div className="my-modal-header">
                        {title && <h2 className="my-modal-title">{title}</h2>}
                        <button className="my-modal-close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="my-modal-body">{children}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-modal-overlay" onClick={onClose}>
            <div className="my-modal-content" style={{ minWidth, maxWidth }} onClick={(e) => e.stopPropagation()}>
                <div className="my-modal-header">
                    {title && <h2 className="my-modal-title">{title}</h2>}
                    <button className="my-modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="my-modal-body">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
