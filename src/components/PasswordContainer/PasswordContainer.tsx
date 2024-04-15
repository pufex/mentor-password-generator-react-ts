import React from 'react'
import "./PasswordContainer.css"

type PasswordContainerProps = {
  placeholder?: string,
  children: string,
  onCopy: () => void
}

const PasswordContainer = ({placeholder, children, onCopy}:PasswordContainerProps): React.ReactElement => {

  return <div 
    className="password-container"
  >
    <div className="password-container__output">
      <span 
        className={
          children && children!=""
            ? "password-container__output value"
            : "password-container__output placeholder"
        }
      >
        {
          children && children!=""
            ? children
            : placeholder
        }
      </span>
      <div className="password-container__buttons">
        <CopyButton
          onCopy={onCopy}
          disabled={children && children!="" ? false : true}
        />
      </div>
    </div>
  </div>
}

export default PasswordContainer

type CopyButtonProps = {
  disabled?: boolean,
  onCopy: PasswordContainerProps["onCopy"]
} 

const CopyButton = ({onCopy, disabled}:CopyButtonProps): React.ReactElement => {
  return <>
    <button
      className="btn btn--copy"
      onClick={onCopy}
      disabled={disabled}
    ></button>
  </>
}