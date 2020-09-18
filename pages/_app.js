/** @jsx jsx */
import { jsx } from "theme-ui";
// noinspection ES6CheckImport
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import Frame from "../src/components/layout/Frame";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </ThemeProvider>
  );
}

// useEffect(() => {
//
//       const createMsg =
//           async () => {
//             await firebase.firestore().collection('test').add({
//               channel: 'channel2',
//               msg: 'msg2'
//             })
//           }
//       createMsg().then(results => results)
//     }, []
// )
