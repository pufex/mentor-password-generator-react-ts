import React, {useState, createContext, useEffect, useRef} from 'react'
import PasswordContainer from '../../components/PasswordContainer/PasswordContainer'
import Form from "../../components/Form/Form"
import MessageBox from "../../components/MessageBox/MessageBox"
import { Checkbox } from './Checkbox/Checkbox'
import {SliderComponent} from './SliderComponent/SliderComponent'
import {Strength} from './Strength/Strength'
import "../../assets/App.css"


const PasswordContext = createContext<string>("");

const App = (): React.ReactElement => {

  const HeaderRef = useRef<HTMLHeadingElement | null>(null)

  const [password, setPassword] = useState("");

  const handleNewPassword = (e: React.FormEvent): void => {
    e.preventDefault();
    HeaderRef.current?.scrollIntoView({behavior: "smooth"})
    let newPassword: string[] = new Array(characterLength).fill(" ");

    const lowercase: string[] = new Array(26).fill(1).map((_, i) => String.fromCharCode(97+i))
    newPassword = newPassword.map(() => {
      const lowercaseLetter = lowercase[Math.floor(Math.random()*lowercase.length)]
      console.log(lowercaseLetter)
      return lowercaseLetter;
    })
    if(includesUppercase){
      const uppercase: string[] = new Array(26).fill(1).map((_, i) => String.fromCharCode(65+i))
      newPassword = newPassword.map(() => {
        const uppercaseLetter = uppercase[Math.floor(Math.random()*uppercase.length)]
        if(Math.floor(Math.random()*Math.ceil(password.length/5)) == 0)
          return uppercaseLetter;
        else return uppercaseLetter
      })
    }
    if(includesSymbols){
      const symbols: string[] = new String("!@#$%^&*").split("");
      newPassword = newPassword.map((letter) => {
        const symbol = symbols[Math.floor(Math.random()*symbols.length)]
        if(Math.floor(Math.random()*Math.ceil(password.length/5)) == 0)
          return symbol
        else return letter
      })
    }
    if(includesNumbers){
      const numbers = new String("1234567890").split("");
      newPassword = newPassword.map((letter) => {
        const number = numbers[Math.floor(Math.random()*numbers.length)];
        if(Math.floor(Math.random()*Math.ceil(password.length/5)) == 0)
          return number
        else return letter
      })
    }
    setPassword(newPassword.join(""));
  }

  const [characterLength, setCharacterLength] = useState(0);
  const characterLenghtChangeHandler = (value: number) => {
    setCharacterLength(value);
  }

  const [includesUppercase, setUppercase] = useState<boolean>(false)
  const switchUppercase = () => {
    setUppercase(previousState => !previousState)
  }
  
  const [includesLowercase, setLowercase] = useState<boolean>(true)
  const switchLowercase= () => {
    setLowercase(previousState => !previousState)
  }
  
  const [includesNumbers, setNumbers] = useState<boolean>(false)
  const switchNumbers = () => {
    setNumbers(previousState => !previousState)
  }

  const [includesSymbols, setSymbols] = useState<boolean>(true)
  const switchSymbols = () => {
    setSymbols(previousState => !previousState)
  }

  const [passwordStrength, setPasswordStrength] = useState<number>(0)

  const changePasswordStrength = (score: number) => {
    console.log("Siła hasła:",passwordStrength)
    setPasswordStrength(score);
  }

  useEffect(() => {
    let score = 0;
    if(includesUppercase) score++;
    if(includesSymbols) score++;
    if(includesNumbers) score++;
    if(password.length > 8) score++
    else if(password.length > 0) score = 2;
    else score = 0;
    changePasswordStrength(score);
  }, [password])


  const [showCopySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopySuccess = () => {
    setCopySuccess(true) 
  }

  const handleAnimationEnd = () => {
    setCopySuccess(false)
  }

  const copyTextHandler = () => {
    if (password){
      navigator.clipboard.writeText(password);
      handleCopySuccess();
    } 
  }

  return <PasswordContext.Provider value={password}>
    {
      showCopySuccess 
        ? <MessageBox 
          duration={5000}
          message="Copied successfully!"
          onMessageHide={handleAnimationEnd}
        />
        : null
    }
    
    <main
      className="app-wrapper"
    >
      <h1 className="app-header" ref={HeaderRef}>
        Password Generator
      </h1>

      <PasswordContainer
        placeholder="P4$5W0rD!"
        onCopy={copyTextHandler}
      >
        {password}
      </PasswordContainer>

      <Form
        onSubmit={handleNewPassword}
        formId='1'
      >
        <div className='slider-container'>
          <SliderComponent
            defaultValue={0}
            steps={20}
            onValueChange={characterLenghtChangeHandler}
          >
            <label className="slider-label">
              <span className="slider-title">
                Character Length
              </span>
              <span className="slider-value">
                {characterLength}
              </span>
            </label>
          </SliderComponent>
        </div>
        <div className="checkboxes-container">
          <Checkbox 
            checked={includesUppercase}
            onCheckChange={switchUppercase}
          >
            Include Uppercase Letters
          </Checkbox>
          <Checkbox 
            checked={includesLowercase}
            onCheckChange={switchLowercase}
          >
            Include Lowercase Letters
          </Checkbox>
          <Checkbox 
            checked={includesNumbers}
            onCheckChange={switchNumbers}
          >
            Include Numbers
          </Checkbox>
          <Checkbox 
            checked={includesSymbols}
            onCheckChange={switchSymbols}
          >
            Include Symbols
          </Checkbox>
        </div>
        <Strength
          passwordStrength={passwordStrength}
        />
      </Form>
    </main>
  </PasswordContext.Provider>
}

export default App

