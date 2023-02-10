import { useState } from "react";
import { createContext } from "react";
import { useGLTF } from '@react-three/drei';

export const ColorContext = createContext({});

// Provider
export const ColorContextProvider = ({ children }) => {
    const { materials } = useGLTF('/apple_iphone_13_pro_max.glb')

    // context로 사용할 state
    const [currentColor, setCurrentColor] = useState({
        color:"#9BB5CE",
        text:"Sierra Blue",
        rgbColor:"155, 181, 206",
    })

    // context로 사용할 함수 (setCurrentColor)
    let changeColorContext = (colorObj) => {
        materials.Body.color.set(colorObj.color);
        setCurrentColor(colorObj)
      }

    return(
        <ColorContext.Provider value={{currentColor, changeColorContext}}>{/* Provider로 전달 */}
            {children}
        </ColorContext.Provider>
    )
}