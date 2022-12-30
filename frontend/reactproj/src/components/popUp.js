import React, { useState }  from "react";
import '../styles/components/popUp.scss';
import RefundRequest from '../components/refundRequest';
function PopUp(){
    const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }
    return(
        <div>
            <button onClick={handleClickOpen}>Open popup</button>
            <div>
                {
                    popup?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header">
                                <h1 class="x" onClick={closePopup}>X</h1>
                            </div>
                            
                            <RefundRequest close={closePopup} test={"his"}/>
                            
                        </div>
                    </div>:""
                }
            </div>
        </div>
    )
}
export default PopUp;