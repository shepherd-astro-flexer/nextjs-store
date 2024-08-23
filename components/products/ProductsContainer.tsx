import { fetchAllProducts } from "@/utils/actions";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuLayoutGrid, LuList } from "react-icons/lu";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const products = await fetchAllProducts();
  const productsLength = products.length;
  const searchParams = search ? `&search=${search}` : "";

  return (
    <>
      <section className="flex justify-between items-center">
        <h4 className="text-lg font-medium">
          {productsLength} product{productsLength > 1 && "s"}
        </h4>
        <div className="flex gap-x-4">
          <Button
            asChild
            variant={layout === "grid" ? "default" : "ghost"}
            size="icon"
          >
            <Link href={`/products?layout=grid${searchParams}`}>
              <LuLayoutGrid />
            </Link>
          </Button>
          <Button
            asChild
            variant={layout === "list" ? "default" : "ghost"}
            size="icon"
          >
            <Link href={`/products?layout=list${searchParams}`}>
              <LuList />
            </Link>
          </Button>
        </div>
      </section>
      <Separator className="mt-4" />
      <div>
        {productsLength === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}
export default ProductsContainer;
