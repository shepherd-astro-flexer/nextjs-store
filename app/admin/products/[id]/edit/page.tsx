import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageContainer from "@/components/form/ImageContainer";
import PriceInput from "@/components/form/PriceInput";
import TextareaInput from "@/components/form/TextareaInput";
import {
  fetchAdminProduct,
  updateSingleProductAction,
  updateProductImageAction,
} from "@/utils/actions";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProduct(id);
  const { name, company, description, featured, price, image } = product;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-lg">
        <ImageContainer
          image={image}
          name={name}
          action={updateProductImageAction}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageContainer>
        <FormContainer action={updateSingleProductAction}>
          {/* Image component */}
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              name="name"
              label="product name"
              type="text"
              defaultValue={name}
            />
            <FormInput
              name="company"
              label="company"
              type="text"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextareaInput
            name="description"
            defaultValue={description}
            labelText="product description"
          />
          <div className="mt-6">
            <CheckboxInput
              label="featured"
              name="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="submit" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditProductPage;
