import React from "react";
import Head from "next/head";
import Layout from "../../layouts";

const Orders = () => {
  return (
    <>
      <Head>
        <title>Pedidos - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <h1>Listado de Pedidos</h1>
      </Layout>
    </>
  );
};

export default Orders;
