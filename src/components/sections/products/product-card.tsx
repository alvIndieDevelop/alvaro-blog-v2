import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

export interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  url: string;
}

export function ProductCard({
  title,
  description,
  price,
  features,
  url,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-3xl font-bold mb-4">${price}</div>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Badge variant="secondary" className="mr-2">
                ✓
              </Badge>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href={url}>Learn More</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
