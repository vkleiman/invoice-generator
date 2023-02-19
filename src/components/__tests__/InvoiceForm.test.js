import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import InvoiceForm from "../InvoiceForm";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Invoice Form", () => {
    act(() => {
      render(<InvoiceForm />, container);
    });

   let el = container.querySelector("span.current-date");
   //console.log(el);

    expect(
      container.querySelector("span.current-date").textContent
    ).toEqual(new Date().toLocaleDateString());

    expect(
      container.querySelector("#total").textContent
    ).toEqual("$1.00");

    let button = container.querySelector("#add_item");
    expect(
      button.textContent
    ).toEqual("Add Item");

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(
      container.querySelector("#total").textContent
    ).toEqual("$2.00");

    //const handleAddEvent = jest.fn();
    //expect(handleAddEvent).toHaveBeenCalledTimes(1);

  });
