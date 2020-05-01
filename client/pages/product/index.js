import React from "react";
import Head from "next/head"
import Layout from "../../layouts";

const Products = () => {
  return (
    <>
      <Head>
        <title>Productos - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <h1>Listado de Productos</h1>
      </Layout>
    </>
  );
};

export default Products;
