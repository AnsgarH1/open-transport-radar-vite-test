import { Box, Button, Grid, GridItem, Heading, Input, useColorModeValue, useDisclosure } from '@chakra-ui/react'

import { Layout } from '../../components'
import Map from '../../components/Map/Map'
import DepartureBoard from '../../components/DepartureBoard/DepartureBoard'

import { LocationContextProvider } from '../../context/LocationContext'

import S from "./Home.module.css";



function Home() {

    const prime = useColorModeValue("primary", "secondary")
    const btn = useColorModeValue("brand.sec", "brand.sec")
    const brand = useColorModeValue("brand.prim", "brand.dark") //Departure Board Background
    const searchbarCol = useColorModeValue("brand.dark", "brand.prim") //Departure Board Background
    const mapCol = useColorModeValue("light", "dark")
    
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
                    <GridItem className={`${S.round} ${S.overflow}`} data-testid="search-item" display="flex" justify-content="center"  align-items="center" bg={searchbarCol} mt="2" colSpan={{ "base": 1, "md": 3 }} w="1fr" >    
                        <Heading display={{ base: "none", md: "block"  }} size="xs" m="2" color="light">Suchleiste</Heading>
                    </GridItem>

                    <GridItem data-testid={"departure-item"} className={`${S.round} ${S.overflow}`} h="auto" w="100%" bg={brand} overflowY="scroll" colSpan={{ "base": 1, "md": 1 }}>
                        <DepartureBoard />
                    </GridItem>
                    <GridItem className={`${S.round} ${S.overflow}`} data-testid="map-item" bg={mapCol} colSpan={{ "base": 1, "md": 2 }} >


                        {isOpen ?
                            <Map /> : <div className={S.marg}><Button data-testid="map-button" w={["full", "full", "auto"]} bg={btn} color="light" onClick={onToggle}>Öffne Karte</Button></div>
                        }

                    </GridItem>


                </Grid >

            </Layout >
        </LocationContextProvider >
    )
}

export default Home