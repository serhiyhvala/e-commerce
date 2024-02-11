"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { IProduct } from "@/types/product.types";

interface IFormProps {
  formState: IProduct;
  handleSubmitForm: (event: FormEvent<HTMLFormElement>, form: IProduct) => void;
  children: ReactNode;
}

const Form: FC<IFormProps> = ({ children, handleSubmitForm, formState }) => {
  const [form, setForm] = useState<IProduct>(formState);

  const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleUpload = (result: any) => {
    setForm({ ...form, image: result.info.secure_url });
  };

  const handleDeleteImage = () => {
    setForm({ ...form, image: "" });
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => handleSubmitForm(e, form)}
    >
      <div className="flex flex-col gap-3 items-start">
        <Label htmlFor="iamge">Images</Label>
        {form.image ? (
          <div className="relative w-[300px]">
            <Image
              src={form.image}
              alt="Image"
              width={300}
              height={300}
              className="rounded-xl"
            />
            <Button
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={handleDeleteImage}
            >
              <Trash />
            </Button>
          </div>
        ) : (
          <ImageUpload handleUpload={handleUpload} />
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="">
          <Label htmlFor="title">Name</Label>
          <Input
            id="title"
            name="title"
            placeholder="Product Name"
            value={form.title}
            onChange={handleChangeInputs}
            required
          />
        </div>
        <div className="">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            value={form.price}
            onChange={handleChangeInputs}
            required
          />
        </div>
        <div className="">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="resize-none"
            id="description"
            name="description"
            placeholder="Product Description"
            onChange={handleChangeTextArea}
            value={form.description}
            required
          />
        </div>
      </div>
      {children}
    </form>
  );
};

export default Form;
