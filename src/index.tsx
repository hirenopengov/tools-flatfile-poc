import React from "react";
import ReactDOM from "react-dom";
import Vendor from "./Vendor";
import VendorAddress from "./VendorAddress";

const rootElement1 = document.getElementById("root1")!;
const rootElement2 = document.getElementById("root2")!;

ReactDOM.render(
  <React.StrictMode>
    <Vendor />
  </React.StrictMode>,
  rootElement1
);

ReactDOM.render(
  <React.StrictMode>
    <VendorAddress />
  </React.StrictMode>,
  rootElement2
);



