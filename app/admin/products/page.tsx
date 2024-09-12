import { formatCurrency } from "@/utils/format";
import { fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { DeleteProduct } from "@/components/form/Buttons";
import EmptyList from "@/components/global/EmptyList";

async function AdminProductsPage() {
  const products = await fetchAdminProducts();

  if (products.length < 1) {
    return <EmptyList />;
  }

  return (
    <section>
      <Table>
        <TableCaption>total products: {products.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const { id: productId, name, company, price } = product;
            const dollarsAmount = formatCurrency(price);

            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="capitalize text-muted-foreground underline "
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{dollarsAmount}</TableCell>
                <TableCell className="flex gap-x-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/products/${productId}/edit`}>
                      <FiEdit />
                    </Link>
                  </Button>
                  <DeleteProduct id={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
export default AdminProductsPage;
