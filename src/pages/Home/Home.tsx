import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react'

import { Layout } from '../../components'
import Map from '../../components/Map/Map'
import DepartureBoard from '../../components/DepartureBoard/DepartureBoard'

import { LocationContextProvider } from '../../context/LocationContext'



import "./Home.css";



function Home() {

    const prime = useColorModeValue("primary", "secondary")
    const sec = useColorModeValue("secondary", "primary")

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
                <GridItem bg="white" mt="2" rounded="lg" boxShadow='lg' colSpan={{ "base": 1, "md": 3 }} w="1fr" >
                    Suchleiste
                </GridItem>
                <LocationContextProvider>
                    <GridItem className="overflow" h="100%" w="100%" bg={sec} rounded="lg" boxShadow='lg' overflowY="scroll" colSpan={{ "base": 1, "md": 1 }}>
                        <DepartureBoard />
                    </GridItem>
                    <GridItem rounded="lg" boxShadow='lg' colSpan={{ "base": 1, "md": 2 }} >
                        <Map />
                    </GridItem>
                </LocationContextProvider>


           </Grid >

        </Layout >
    )
}

export default Home