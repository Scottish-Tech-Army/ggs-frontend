/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render } from "@testing-library/react";
import Pin from "./Pin";

describe("component Pin", () => {

  it("show uncollected location", () => {
    render(<Pin location={{}}/>);

    expect(document.querySelector("img")).toHaveAttribute("src", "mapbox-marker-branded.svg");
  });

  it("show collected location", () => {
    render(<Pin location={{collected: true}}/>);

    expect(document.querySelector("img")).toHaveAttribute("src", "mapbox-marker-branded-muted.svg");
  });
    
});
