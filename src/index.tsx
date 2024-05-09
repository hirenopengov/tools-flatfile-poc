import React from "react";
import ReactDOM from "react-dom";
import Vendor from "./Vendor";
import VendorAddress from "./VendorAddress";

const rootElement = document.getElementById("root")!;

ReactDOM.render(
  <React.StrictMode>
    <Vendor />
    <VendorAddress />
  </React.StrictMode>,
  rootElement
);



