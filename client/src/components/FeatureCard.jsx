import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingStar from "./RatingStar";
import { Link } from "react-router-dom";

function FeatureCard({ product }) {
  return (
    <Card className="my-2  mx-1">
      <CardContent className="p-0">
        <img
          src={product.images[0].imageUrl}
          alt="product_img"
          className="rounded-t-md"
        />
      </CardContent>
      <CardHeader className="flex">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col gap-y-1">
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="card_header">$3500</CardDescription>
              <CardDescription className="card_header flex gap-x-2 items-center">
                {RatingStar(product.rating)} <span>{product.numReviews}</span>
              </CardDescription>
            </div>
            <div>
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
        </Link>
      </CardHeader>
    </Card>
  );
}

export default FeatureCard;
