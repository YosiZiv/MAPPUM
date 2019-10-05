import React from 'react';
import './ProgressBar.css';
const progressBar = (props) => {
    const { stage } = props;
    const successStyle = {
        background: '#5AEE45',

    }  
    return (
        <div className = "progressBarContainer">
            <div className = "ProgressBarStart">
                <div className="UserCircle" style={ stage === 'register' ||stage === 'createProduct' || stage === 'submit' || stage === 'success'? successStyle : null }>
                    <div style={ stage === 'createProduct' || stage === 'submit'|| stage === 'success' ? successStyle : null } className = "IconWrapper">
                    <i  className="ProgressBaricon fas fa-user-tie"></i>  
                </div>

                </div>
                <span className = "UserLine" style={ stage === 'createProduct' || stage === 'submit'|| stage === 'success' ? successStyle : null }></span>
            </div>
            <div className = "ProgressBarStart">
                <div className="UserCircle" style={ stage === 'createProduct' || stage === 'submit'|| stage === 'success' ? successStyle : null }>
                    <div style={stage === 'submit' || stage === 'success'? successStyle : null } className = "IconWrapper">
                    <i className="ProgressBaricon fas fa-store"></i> 
                </div>

                </div>
                <span className="UserLine" style={ stage === 'submit' || stage === 'success' ? successStyle : null } ></span>
                
            </div>
            <div className = "ProgressBarEnd">
                <div className="UserCircle" style={stage === 'submit' || stage === 'success' ? successStyle : null }>
                    <div style={ stage === 'success'? successStyle : null }  className = "IconWrapper">
                    <i className="ProgressBaricon fas fa-file-contract"></i>
                </div>
                </div>     
            </div>
     
        </div>
    )
}
export default progressBar;