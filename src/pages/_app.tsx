import { type AppType } from "next/dist/shared/lib/utils";

import "my-third-app/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

export default MyApp;
