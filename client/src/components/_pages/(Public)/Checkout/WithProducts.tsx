import React from "react";
import WithProductProviders from "./Providers";
import ProductList from "./ProductList";
import ProjectCta from "./ProductCta";

export default function WithProducts() {
  return (
    <WithProductProviders>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductList />

        <ProjectCta />
      </div>
    </WithProductProviders>
  );
}
