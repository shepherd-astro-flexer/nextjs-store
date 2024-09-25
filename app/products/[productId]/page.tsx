import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import RenderProductReviews from "@/components/reviews/RenderProductReviews";
import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
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
        <div className="relative w-96 h-96 lg:h-full lg:w-full">
          <Image
            src={image}
            alt="name"
            fill
            priority
            className="rounded-lg object-cover w-full"
            sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Details */}
        <div>
          <div className="flex items-center gap-x-6">
            <h1 className="font-bold text-3xl capitalize">{name}</h1>
            <div className="flex gap-x-2">
              <FavoriteToggleButton productId={productId} />
              <ShareButton productId={productId} name={name} />
            </div>
          </div>
          <ProductRating productId={productId} />
          <p className="text-xl mt-2 font-medium">{company}</p>
          <p className="p-2 rounded bg-muted mt-3 inline-block">
            {dollarsAmount}
          </p>
          <p className="mt-6 text-muted-foreground leading-8">{description}</p>
          <AddToCart productId={productId} />
        </div>
      </div>
      <RenderProductReviews productId={productId} />
      <ProductReviews productId={productId} />
    </section>
  );
}
export default ProductDetails;
