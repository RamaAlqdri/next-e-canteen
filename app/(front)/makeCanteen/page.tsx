import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Make Canteen",
};

export default async function MakeCanteen() {
  return <Form />;
}
