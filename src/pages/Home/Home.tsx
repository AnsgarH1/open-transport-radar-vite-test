import { Heading, Text, Container, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../../components'
import DepartureBoard from '../../components/DepartureBoard/DepartureBoard'
import Map from './Map'

function Home() {
    return (
        <Layout>
            <Grid
                m={{ "base": "0", "sm": "0", "md": "0 auto" }}
                px="2"
                maxW="100vw"
                minH="100vh"
                gap={{ "base": "0.5rem", "md": "2rem" }}
                templateColumns={{ "base": "1fr", "md": "repeat(3,1fr)" }}
                templateRows={{ "base": "4rem auto 1fr", "md": "4rem auto" }}

            >
                <GridItem bg="gray.100" colSpan={{ "base": 1, "md": 3 }} w="1fr" >
                    Suchleiste
                </GridItem>
                <GridItem bg="blue.100" colSpan={{ "base": 1, "md": 1 }}><DepartureBoard /></GridItem>
                <GridItem bg="green.100" colSpan={{ "base": 1, "md": 2 }} ><Map /></GridItem>
            </Grid>
        </Layout>
    )
}

export default Home