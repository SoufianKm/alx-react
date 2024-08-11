import { getFooterCopy, getFullYear } from "../utils/utils";
import React from "react";

function Footer() {
  return (
    <>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(false)}
      </p>
    </>
  );
}

export default Footer;
