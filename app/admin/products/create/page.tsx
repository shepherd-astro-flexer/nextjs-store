import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";

import { faker } from "@faker-js/faker";

const createProductAction = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  const product = { id: Date.now().toString, name };
};

function CreateProductPage() {
  const name = faker.commerce.productName();
  const number = faker.number.int({ min: 20, max: 25 });
  console.log(number);
  return (
    <section>
      <h1 className="text-3xl font-bold">Create Product</h1>
      <div>
        <form action={createProductAction} className="border rounded-lg p-6">
          <FormInput
            name="name"
            label="product name"
            type="text"
            defaultValue={name}
          />
          <ImageInput />
          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
export default CreateProductPage;
