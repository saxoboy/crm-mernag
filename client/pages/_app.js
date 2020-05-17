import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../theme";

import { AuthProvider } from "../context/auth";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
