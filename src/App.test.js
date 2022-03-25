import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
import SearchInput from "./SearchInput";

test("typing text and change state function", () => {
  const fun = jest.fn();
  const component = render(<SearchInput textChange={fun} />);
  const input = component.getByLabelText("search-input");
  fireEvent.change(input, { target: { value: "1" } });
  expect(input.value).toBe("1");
  fireEvent.change(input, { target: { value: "10" } });
  expect(input.value).toBe("10");
  fireEvent.change(input, { target: { value: "100" } });
  expect(input.value).toBe("100");
  expect(fun).toHaveBeenCalledTimes(3);
});

test("Filter base on input", () => {
  const component = render(<App />);
  const input = component.getByLabelText("search-input");
  fireEvent.change(input, { target: { value: "kiss" } });
  const items = component.queryAllByLabelText("item");
  expect(items.length).toBe(9);
});
