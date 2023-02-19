import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import EditableField from "../EditableField";

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

it("render EditableField", () => {
    act(() => {
      render(<EditableField onItemizedItemEdit={undefined}
        cellData={{
        type: "text",
        name: "description",
        placeholder: "Item description",
        value: "item description",
        id: "xxxx"
      }}/>, container);
    });

    expect(
      container.querySelector("input#xxxx").getAttribute("value")
    ).toEqual("item description");

  });
