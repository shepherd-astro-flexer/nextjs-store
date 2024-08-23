import { Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { image, name, price, company } = product;
        const productId = product.id;
        const dollarsAmount = formatCurrency(price);

        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 grid gap-y-4 md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48 rounded">
                    <Image
                      src={image}
                      alt="product"
                      fill
                      className="object-cover rounded w-full"
                      priority
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <h2 className="capitalize font-semibold text-xl">{name}</h2>
                    <p className="text-muted-foreground">{company}</p>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute right-7 bottom-7 z-50">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsList;
