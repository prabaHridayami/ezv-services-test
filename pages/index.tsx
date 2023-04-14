import Image from "next/image";

import { getAllProducts } from "../helpers/api-util";
import { GetStaticProps } from "next";
import Link from "next/link";

export interface ProductProps {
  id: BigInteger;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

interface HomeProps {
  products: Array<ProductProps>;
}

const Home = (props: HomeProps) => {
  const { products } = props;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {products.map((item) => (
        <Link
          href={`/${item.id}`}
          passHref
          className="flex flex-col md:flex-row border-bottom border-b-2 boder-b-black p-3 md:p-6 w-full gap-6 hover:bg-gray-50"
        >
          <div className="relative bg-gray-100 text-center h-60 w-80">
            <Image
              layout="fill"
              objectFit="contain"
              src={item.thumbnail}
              alt={item.title}
            />
          </div>
          <div className="grow flex flex-col justify-between">
            <div>
              <p>
                {item.title} - {item.brand}
              </p>
              <p>{item.description}</p>
            </div>

            <div className="flex">
              <p className="border border-2 border-blue-500 bg-blue-100 p-2">
                {item.category}
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-between">
            <p>${item.price}</p>
            <p>Rating:{item.rating}</p>
          </div>
        </Link>
      ))}
    </main>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allProducts = await getAllProducts();

  return {
    props: {
      products: allProducts,
    },
    revalidate: 1800,
  };
};

export default Home;
