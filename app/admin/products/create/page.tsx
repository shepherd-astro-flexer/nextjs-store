import { SubmitButton } from "@/components/form/Buttons";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextareaInput from "@/components/form/TextareaInput";
import { createProductAction } from "@/utils/actions";

import { faker } from "@faker-js/faker";

function CreateProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const number = faker.number.int({ min: 20, max: 25 });
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>
      <div className="border p-8 rounded-lg">
        <FormContainer action={createProductAction}>
          <div className="grid md:grid-cols-2 gap-4 my-4">
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
            <PriceInput defaultValue={number} />
            <ImageInput />
          </div>
          <TextareaInput
            name="description"
            defaultValue={description}
            labelText="product description"
          />
          <div className="mt-6">
            <CheckboxInput label="featured" name="featured" />
          </div>
          <SubmitButton text="submit" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProductPage;
