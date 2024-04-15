import {useEffect} from 'react'
import "./MessageBox.css"

type MessageBoxProps = {
  message: string,
  duration: number,
  onMessageHide: () => void,
}

const MessageBox = ({duration, message, onMessageHide}:MessageBoxProps): React.ReactElement => {

  useEffect(() => {
    let timeout: number | undefined;
    timeout = setTimeout(() => {
      onMessageHide();
      clearTimeout(timeout);
    }, duration)
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return <div 
    className="message-box"
    style={{
      animationDuration: duration.toString() + "ms",
    }}
  > 
    <span className="message-box__message">
      {message}
    </span>
    <div className="message-box__progressbar">
      <div 
        className="message-box__progressbar-fill"
        style={{
          animationDuration: duration.toString() + "ms",
        }}
      ></div>
    </div>
  </div>
}

export default MessageBox