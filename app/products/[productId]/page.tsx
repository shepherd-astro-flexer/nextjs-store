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
      <div className="grid gap-12 lg:grid-cols-2 mt-8">
        {/* Image */}
        <div className="relative h-96 w-96 lg:w-auto">
          <Image
            src={image}
            alt="name"
            fill
            priority
            className="rounded-lg object-cover "
          />
        </div>
        {/* Details */}
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-3xl capitalize mr-6">{name}</h1>
            <FavoriteToggleButton productId={productId} />
          </div>
          <ProductRating />
          <p className="text-xl my-4 font-medium">{company}</p>
          <span className="p-2 rounded bg-muted mt-4">{dollarsAmount}</span>
          <p className="mt-6 text-muted-foreground">{description}</p>
          <AddToCart productId={productId} />
        </div>
      </div>
    </section>
  );
}
export default ProductDetails;
