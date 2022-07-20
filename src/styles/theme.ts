import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'

// const config: ThemeConfig = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// }

export const theme = extendTheme({
    initialColorMode:'light',
    colors: {
        primary: "white",
        secondary: "#1A202C",
        tertiary: "#F7FAFC",
        quartiary: "#171923",
        warning: "#845EC2",
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