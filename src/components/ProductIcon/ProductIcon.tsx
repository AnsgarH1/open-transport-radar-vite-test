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
    return <Icon as={MdTrain} />;
  if (product.uBahn) return <Icon as={MdSubway} />;
  if (product.bus) return <Icon as={MdDirectionsBus} />;
  if (product.watercraft) return <Icon as={MdDirectionsBoat} />;
  return <Icon as={MdLocationPin} />;
}
export default ProductIcon;
