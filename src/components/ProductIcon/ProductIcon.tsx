import { Icon } from "@chakra-ui/react";
import {
  MdTrain,
  MdSubway,
  MdDirectionsBus,
  MdDirectionsBoat,
  MdLocationPin,
} from "react-icons/md";

function ProductIcon({ product }: { product: Hafas_Stations.Products }) {
  if (
    product.longDistanceTrain ||
    product.expressTrain ||
    product.regionaTrain ||
    product.sBahn
  )
    return <Icon color="white" as={MdTrain} />;
  if (product.uBahn) return <Icon color="white" as={MdSubway} />;
  if (product.bus) return <Icon color="white" as={MdDirectionsBus} />;
  if (product.watercraft) return <Icon color="white" as={MdDirectionsBoat} />;
  return <Icon color="white" as={MdLocationPin} />;
  //TODO color in css
}
export default ProductIcon;
