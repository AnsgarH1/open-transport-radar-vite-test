import { ChevronDownIcon, ChevronUpIcon, RepeatIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Flex, Heading, Icon, IconButton, Skeleton, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaBus, FaLocationArrow } from "react-icons/fa";
import ProductIcon from "../ProductIcon/ProductIcon";
import DepartureItem from "./DepartureItem";
import useDepartures from "./departureHooks/useDepartures";



function DepartureStation({ station, index }: { station: Hafas_Stations.Station, index: number }) {
  const { name, distance, products, id, type } = station;

  const { departures, isLoading, loadDepartures, toggleShowAll, showAll, showAllButtonRef, showMoreAvailable } = useDepartures(id);

  const prime = useColorModeValue("white", "dark")
  const brand = useColorModeValue("brand.prim", "brand.dark")
  const btnCol = useColorModeValue("brand.tert", "brand.tert")


  return (
    <Box key={station.id + index} rounded="lg" p="2" m="2" bgColor={prime} boxShadow="inner" my="2" flex="1" alignItems={"center"}>

      {/**Haltestellen Überschrift */}

      <Flex align="center" justify="space-between" bgColor={brand} rounded="lg" boxShadow="lg" color={prime} px="2" py="1" >
        <Box>
          <Flex align="center">
            <ProductIcon product={products} />
            <Heading size="md" color="white">{name}</Heading>
          </Flex>
          <Flex align="center">
            <Icon mr="2" size="xs" color="white" as={FaLocationArrow} />
            <Text color="white">{distance}m </Text>
          </Flex>
        </Box>
        <IconButton aria-label="refresh" icon={<RepeatIcon color={prime} />} size="md" variant="ghost" onClick={loadDepartures} />
      </Flex>

      {/** Abfahrten */}

      {isLoading ? (
        <Box m="1">
          <Flex w="100%">
            <Skeleton h="1.3rem" w="1rem" mr="1" color={"blue.300"}/>
            <Skeleton h="1.3rem" w="full" />
          </Flex>
          <Skeleton h="2rem" w="full" mt="1" />
          <Flex w="100%" mt="2">
            <Skeleton h="1.3rem" w="1rem" mr="1" />
            <Skeleton h="1.3rem" w="full" />
          </Flex>
          <Skeleton h="2rem" w="full" mt="1" />
          <Flex w="100%" mt="2">
            <Skeleton h="1.3rem" w="1rem" mr="1" />
            <Skeleton h="1.3rem" w="full" />
          </Flex>
          <Skeleton h="2rem" w="full" mt="1" />
        </Box>


      ) : (
        <Box px="2">
          <Accordion allowToggle >
            {
              departures.map((departure, i) => <DepartureItem key={departure.tripId} departure={departure} index={i} />)
            }
          </Accordion>
          {showMoreAvailable &&
            <Button leftIcon={showAll ? <ChevronUpIcon /> : <ChevronDownIcon />} w="full" size="xs" my="2" ref={showAllButtonRef} onClick={toggleShowAll}>Zeige {showAll ? "weniger" : "mehr"} Abfahrten</Button>
          }</Box>
      )
      }
    </Box >
  );
}

export default DepartureStation;
