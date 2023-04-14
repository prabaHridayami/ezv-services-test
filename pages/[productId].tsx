import Head from "next/head";
import { Fragment } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { ProductProps } from ".";
import { getAllProducts, getProductById } from "@/helpers/api-util";

import Image from "next/image";

interface DetailProps {
  product: ProductProps;
}

const ProductDetail = (props: DetailProps) => {
  const { product } = props;

  if (!product) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="w-full h-[20rem] md:h-[30rem] relative bg-gray-200">
        <Image
          src={product.thumbnail}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-col md:flex-row p-10 w-full justify-between h-60">
        <div className="flex flex-col justify-between">
          <div>
            <p>
              {product.title} - {product.brand}
            </p>
            <p>{product.description}</p>
          </div>
          <div className="flex">
            <p className="border border-2 border-blue-500 bg-blue-100 p-2">
              {product.category}
            </p>
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-between text-right">
          <p>${product.price}</p>
          <p>Rating:&nbsp;{product.rating}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-6">
        {product.images.map((image, i) => (
          <div key={i} className="relative h-[12rem]">
            <Image src={image} alt={product.title} layout="fill" />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

interface Params extends ParsedUrlQuery {
  productId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { productId } = context.params as Params;
  const selectedProduct = await getProductById(productId);

  return {
    props: {
      product: { ...selectedProduct },
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();

  const paths = products.map((product) => ({
    params: { productId: product.id.toString() },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default ProductDetail;
