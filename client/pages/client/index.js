import React from "react";
import Head from "next/head";
import Layout from "../../layouts";

const Clients = () => {
  return (
    <>
      <Head>
        <title>Clientes - MERNAG + Apollo + GraphQL</title>
      </Head>
      <Layout>
        <h1>Listado de Clientes</h1>
      </Layout>
    </>
  );
};

export default Clients;
