import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {  Box, Flex } from "@chakra-ui/react";


function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Flex h="100vh" w="100vw" justifyContent={"space-between"} direction="column" >
            <Box>
                <Header />
            </Box>

            <Box flex="1" overflow={"hidden"}>
                {children}

            </Box>
            <Box>
                <Footer />
            </Box>

        </Flex>
    )
}

export default Layout