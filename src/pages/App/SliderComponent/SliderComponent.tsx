import { useEffect, useState, useRef } from "react"
import "./SliderComponent.css"

type SliderComponentProps = {
  defaultValue?: number,
  steps: number,
  children: React.ReactElement;
  onValueChange: (value: number) => void;
}

export const SliderComponent = ({children, steps, defaultValue, onValueChange}:SliderComponentProps): React.ReactElement => {
  
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.dir(sliderRef.current);
  }, [sliderRef])

  const [currentValue, setCurrentValue] = useState<number>(defaultValue ? defaultValue : 0)

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>): void => {

    // @ts-ignore: Idk bro
    const x:number = sliderRef.current?.offsetLeft!;
    // @ts-ignore: everything is fine happy face
    const width:number = sliderRef.current?.offsetWidth!
    const mouseX = e.clientX;
    
    const newValue: number = Math.round((mouseX - x)/width*steps);
    setCurrentValue(newValue);
  }

  useEffect(() => {
    onValueChange(currentValue)
  }, [currentValue])
  
  return <div
    className="slider-container"
  >
    {children}
    <div className="slider-container-itself">
      <div 
        className="slider"
        onClick={(e) => {
          handleSliderClick(e);
        }}
        ref={sliderRef}
      >
          <div 
            className="slider__fill"
            style={{
              width: `${currentValue/steps*100}%`,
            }}
          >
            <div className="slider__circle"></div>
          </div>
      </div>
    </div>
  </div>
}

