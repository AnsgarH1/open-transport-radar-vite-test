import { Heading, Text, Container, Grid, GridItem } from '@chakra-ui/react'

import { Layout } from '../../components'
import DepartureBoard from '../../components/DepartureBoard/DepartureBoard'

function Home() {
    return (
        <Layout>

            <Grid
                h="100%"
                py={{ "base": "0.5rem", "md": "0.5rem" }}
                px={{ "base": "0.1rem", "md": "0.5rem" }}
                gap={{ "base": "0.5rem", "md": "0.5rem" }}
                templateColumns={{ "base": "1fr", "md": "repeat(3,1fr)" }}
                templateRows={{ "base": "2rem 1fr", "md": "4rem 1fr" }}

            >
                <GridItem bg="gray.100" colSpan={{ "base": 1, "md": 3 }}  >
                    Suchleiste
                </GridItem>
                <GridItem h="100%" w="100%" overflowY="scroll" colSpan={{ "base": 1, "md": 1 }}><DepartureBoard /></GridItem>
                <GridItem bg="green.500" h="100%" colSpan={{ "base": 1, "md": 2 }} >Radar</GridItem>
            </Grid>

        </Layout>
    )
}

export default Home