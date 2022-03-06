import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { Container } from "@nextui-org/react";

import store from "../redux/store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Container css={{ pt: "$8" }}>
          <Component {...pageProps} />
        </Container>
      </NextUIProvider>{" "}
    </Provider>
  );
}

export default MyApp;
