import { RepeatIcon } from "@chakra-ui/icons";
import { Accordion, Box, Flex, Heading, Icon, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaBus, FaLocationArrow } from "react-icons/fa";
import ProductIcon from "../ProductIcon/ProductIcon";
import DepartureItem from "./DepartureItem";
import useDepartures from "./useDepartures";

function DepartureStation({ station, index }: { station: Hafas_Stations.Station, index: number }) {
  const { name, distance, products, id, type } = station;

  const { departures, isLoading, loadDepartures } = useDepartures(id);

  return (
    <Box key={station.id + index} rounded="lg" p="2" m="2" boxShadow="inner" bgColor="white" my="1" flex="1" alignItems={"center"}>
      <Flex align="center" justify="space-between" boxShadow="lg" bgColor="gray.800" p="2">
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
        <IconButton aria-label="refresh" icon={<RepeatIcon />} onClick={loadDepartures} />
      </Flex>
      <Accordion px="2">

        {isLoading ? (
          <Spinner alignSelf={"center"} />
        ) : (
          departures.map((departure, i) => <DepartureItem key={departure.tripID} departure={departure} index={i} />)
        )}
      </Accordion>
    </Box>
  );
}

export default DepartureStation;
