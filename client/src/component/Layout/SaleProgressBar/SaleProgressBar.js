import React from 'react';
import './SaleProgressBar.css';
const progressBar = (props) => {
    const { stage } = props;
    const successStyle = {
        background: '#5AEE45',

    }

    return (
        <div className = "progressBarContainer">
            <div className = "ProgressBarStart">
                <div className="UserCircle" style={ stage === 'stage1' ||stage === 'stage2' || stage === 'stage3'? successStyle : null }>
                    <div style={ stage === 'stage2' || stage === 'stage3' ? successStyle : null } className = "IconWrapper">
                    <i  className="ProgressBaricon fas fa-user-tie"></i>  
                </div>
                </div>
                <span className = "UserLine" style={ stage === 'stage2' || stage === 'stage3' ? successStyle : null }></span>
            </div>
            <div className = "ProgressBarStart">
                <div className="UserCircle" style={ stage === 'stage2' || stage === 'stage3' ? successStyle : null }>
                    <div style={stage === 'stage3' ? successStyle : null } className = "IconWrapper">
                    <i className="ProgressBaricon fas fa-store"></i> 
                </div>

                </div>
                <span className="UserLine" style={ stage === 'stage3' ? successStyle : null } ></span>
                
            </div>
            <div className = "ProgressBarEnd">
                <div className="UserCircle" style={stage === 'stage3' ? successStyle : null }>
                    <div className = "IconWrapper">
                    <i className="ProgressBaricon fas fa-file-contract"></i>
                </div>
                </div>     
            </div>
     
        </div>
    )
}
export default progressBar;