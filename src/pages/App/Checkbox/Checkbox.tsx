import { useState } from "react"
import { GiCheckMark } from "react-icons/gi";
import "./Checkbox.css"

type CheckboxProps = {
  checked: boolean,
  onCheckChange: () => void,
  children: string,
}

export const Checkbox = ({checked, onCheckChange, children}:CheckboxProps) => {

  return <div
    className="checkbox-container"
  >
    <div
      className={checked ? "checkbox active" : "checkbox"}
      onClick={onCheckChange}
    >
      {
        checked 
          ? <GiCheckMark 
              style={{
                color: "white",
              }}
              size={20}
          />
          : null
      }
    </div>
    <label className="checkbox-label">
      {children}
    </label>
  </div>
}