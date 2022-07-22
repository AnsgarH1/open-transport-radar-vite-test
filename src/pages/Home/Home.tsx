import { Box, Button, Grid, GridItem, useColorModeValue, useDisclosure } from '@chakra-ui/react'

import { Layout } from '../../components'
import Map from '../../components/Map/Map'
import DepartureBoard from '../../components/DepartureBoard/DepartureBoard'

import { LocationContextProvider } from '../../context/LocationContext'



import "./Home.css";



function Home() {

    const prime = useColorModeValue("primary", "secondary")
    const sec = useColorModeValue("secondary", "primary")

    const { onToggle, isOpen } = useDisclosure()
    return (
        <LocationContextProvider>
            <Layout >

                <Grid
                    h="100%"
                    py={{ "base": "0.5rem", "md": "0.5rem" }}
                    px={{ "base": "0.5rem", "md": "0.5rem" }}
                    gap={{ "base": "1rem", "md": "0.5rem" }}
                    templateColumns={{ "base": "1fr", "md": "repeat(3,1fr)" }}
                    templateRows={{ "base": "30px 2fr 1fr", "md": "4rem 1fr" }}
                    data-testid={"main-grid"}

                >
                    <GridItem data-testid={"search-item"} bg="white" mt="2" rounded="lg" boxShadow='lg' colSpan={{ "base": 1, "md": 3 }} w="1fr" >
                        Suchleiste
                    </GridItem>
                    <GridItem data-testid={"departure-item"} className="overflow" h="auto" w="100%" bg={sec} rounded="lg" boxShadow='lg' overflowY="scroll" colSpan={{ "base": 1, "md": 1 }}>
                        <DepartureBoard />
                    </GridItem>
                    <GridItem data-testid={"map-item"} rounded="lg" boxShadow='lg' colSpan={{ "base": 1, "md": 2 }} >


                        {isOpen ?
                            <Map />
                            : <Button data-testid={"map-button"} w="full" color={sec} onClick={onToggle} >
                                öffne Karte
                            </Button>}

                    </GridItem>


                </Grid >

            </Layout >
        </LocationContextProvider>
    )
}

export default Home