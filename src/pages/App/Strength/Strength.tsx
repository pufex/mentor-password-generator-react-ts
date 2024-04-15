import React, { useEffect, useState } from 'react'
import "./Strength.css"

type StrengthProps = {
  passwordStrength: number,
}

type StrengthInfoType = {
  message: React.ReactElement,
  bars: React.ReactElement,
}

export const Strength = ({passwordStrength}:StrengthProps): React.ReactElement => {

  const [strengthInfo, setStrengthInfo] = useState<StrengthInfoType | undefined>();
  
  const handlePasswordChange = () => {
    const newBars: React.ReactElement[] = new Array(4)
    for(let i = 0; i < newBars.length; i++)
      newBars[i] = <div
        className={i+1 <= passwordStrength ? "strength-bar active" : "strength-bar"}
      ></div>
    let newMessage;
    switch(passwordStrength){
      default: 
        newMessage = "Invalid";
        break;
      case 1:
        newMessage = "Very low";
        break;
      case 2:
        newMessage = "Low";
        break;
      case 3:
        newMessage = "Medium";
        break;
      case 4:
        newMessage = "High";
        break;
    }
    setStrengthInfo({
      message: <span
        className="strength-info"
      >
        {newMessage}
      </span>,
      bars: <div
        className="strength-bars"
      >
        {newBars}
      </div>,
    })
  }

  useEffect(() => {
    handlePasswordChange();
  }, [passwordStrength])
  
  return <div
    className='strength-container'
  >
    <span className='strength-title'>
      STRENGTH
    </span>
    <div className="strength__summary">
      {strengthInfo?.message}
      {strengthInfo?.bars}
    </div>
  </div>
}

export default Strength