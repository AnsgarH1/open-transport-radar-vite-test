import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    colors: {
        // primary: "white",
        // secondary: "#1A202C",
        // tertiary: "#F7FAFC",
        // quartiary: "#171923",
        // warning: "#845EC2",

        dark:"#1A202C",
        light:"#F7FAFC",

        brand: {
          prim: "#789E9E",
          sec: "#FE615A",
          tert: "#EEF3D8",
          dark: "#4D6466",
          light: "#B7D8D6"
        }
    }
})

// export const theme = extendTheme({
//     colors: (props) => ({
//         primary: mode("white", "#1A202C")(props),
//         secondary: mode("#1A202C", "white")(props),
//         tertiary: "#F7FAFC",
//         warning: "#845EC2",
//     })
// })