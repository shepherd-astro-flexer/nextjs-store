import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { fetchSingleProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";

async function ProductDetails({ params }: { params: { productId: string } }) {
  const productId = params.productId;
  const product = await fetchSingleProduct({ productId });
  const { company, image, name, price, description } = product;
  const dollarsAmount = formatCurrency(price);

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="grid gap-y-8 lg:gap-16 lg:grid-cols-2 mt-8">
        {/* Image */}
        <div className="relative h-full w-96 lg:w-auto">
          <Image
            src={image}
            alt="name"
            fill
            priority
            className="rounded-lg object-cover w-full"
            sizes="(max-width:768px) 100vw, (max-width: 1200) 50vw, 33vw"
          />
        </div>
        {/* Details */}
        <div>
          <div className="flex items-center gap-x-6">
            <h1 className="font-bold text-3xl capitalize">{name}</h1>
            <FavoriteToggleButton productId={productId} />
          </div>
          <ProductRating />
          <p className="text-xl mt-2 font-medium">{company}</p>
          <p className="p-2 rounded bg-muted mt-3 inline-block">
            {dollarsAmount}
          </p>
          <p className="mt-6 text-muted-foreground leading-6">{description}</p>
          <AddToCart productId={productId} />
        </div>
      </div>
    </section>
  );
}
export default ProductDetails;
