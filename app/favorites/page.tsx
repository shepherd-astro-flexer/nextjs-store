import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";

async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  console.log(favorites);
  if (favorites.length < 1)
    return <SectionTitle text="you have no favorites yet." />;

  const products = favorites.map((favorite) => favorite.product);
  return (
    <>
      <SectionTitle text="favorites" />
      <ProductsGrid products={products} />
    </>
  );
}
export default FavoritesPage;
