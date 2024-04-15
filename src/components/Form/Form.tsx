import React from 'react'
import "./Form.css"

type FormProps = {
  children: React.ReactElement[] | React.ReactElement,
  onSubmit: (e: React.FormEvent) => void,
  formId: string,
}

const Form = ({children, onSubmit, formId}: FormProps): React.ReactElement => {
  

  return <form
    onSubmit={onSubmit}
    className="form"
    id={`form-${formId}`}
  >
    {children}
    <button
      type='submit'
      className="btn btn--submit"
    >
      Generate
    </button>
  </form>
}

export default Form