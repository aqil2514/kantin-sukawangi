import { client } from "../lib/client";
import { urlFor } from "../lib/image";

const fetchProducts = async () => {
  const query = `*[_type == "product"] { 
    _id, 
    name, 
    description, 
    price, 
    image, 
    category 
  }`;

  const products = await client.fetch(query);
  return products;
};

const servedProductList = async (): Promise<Product.ProductAttributes[]> => {
  const products = await fetchProducts();
  const result: Product.ProductAttributes[] = [];

  for (const product of products) {
    const res: Product.ProductAttributes = {
      category: product.category,
      description: product.description,
      id: product._id,
      price: product.price,
      name: product.name,
      imageUrl: urlFor(product.image).url(),
      isAvailable: true,
    };

    result.push(res);
  }

  return result;
};

export { fetchProducts, servedProductList };
