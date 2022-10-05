import "react-native";
import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { App } from "../src/app";

describe("app", () => {
  it("should render", () => {
    expect.hasAssertions();
    expect(renderer.create(<App />)).not.toThrow();
  });
});
