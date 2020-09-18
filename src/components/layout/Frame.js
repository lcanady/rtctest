/** @jsx jsx */
import { jsx } from "theme-ui";
import Nav from "../shared/Nav";
import Video from "../main/Video";
import Channels from "../sidebar/Channels";
import Controls from "../sidebar/Controls";
import Search from "../shared/Search";
import { Layout } from "../blog/Layout";
// import Head from 'next/head'

// import the library
// import { library } from '@fortawesome/fontawesome-svg-core';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

// import your icons
// import {faSearch} from '@fortawesome/pro-duotone-svg-icons'

export default function Frame({ children }) {
  return (
    <div sx={{ variant: "layout.container" }}>
      <header sx={{ variant: "layout.nav" }}>
        <Nav />
        <Search />
      </header>

      <section sx={{ variant: "layout.sidebar" }}>
        <Channels />
        <Controls />
      </section>

      <main sx={{ variant: "layout.video" }}>{children}</main>
    </div>
  );
}
