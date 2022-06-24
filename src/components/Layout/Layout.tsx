import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";


function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Grid minH="100vh"  templateRows="auto 1fr auto">
            <GridItem>
                <Header />
            </GridItem>
            <GridItem alignItems="center" justifyContent="center" border="solid">

                {children}

            </GridItem>
            <GridItem>
                <Footer />
            </GridItem>
        </Grid>
    )
}

export default Layout