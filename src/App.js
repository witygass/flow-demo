// ======= Comment this line at end and run flow =======
// @flow

import React from "react";
import MyComponent from "./MyComponent";
import "./App.css";

import type { MyPersonType } from "./MyPersonType";

const personInstanceJohn = {
  // ======= Comment This Prop: Demonstrate Object / Variable Property Validation =======
  name: "John",
  birthday: new Date("2/2/1990"),
  age: 25
};

// ======= Naive Example of Property Assignment Handler =======
const mutationHandler = (property: "name" | "age") => newValue => {
  if (property === "age") {
    personInstanceJohn[property] = Number(newValue);
  } else if (property === "name") {
    personInstanceJohn[property] = String(newValue);
  }

  // ======= Uncomment: Demonstrate types incompatibility (newValue is an "any" type by default ->
  // because property could go into age or name props on the modelIstance, this is not okay
  // personInstanceJohn[property] = newValue;

  // ======= Comment This Line: Demonstrate Return Type Validation =======
  return personInstanceJohn;
};

function App() {
  return (
    <MyComponent
      anInt={5}
      aString={"a"}
      aJsxElement={
        // ======= Change to Span: Demonstrate JSX / React Element support =======
        <div>some useless text</div>
      }
      myCustomObject={personInstanceJohn}
      aListItem="one"
      anArrayOfMyModelObjects={[
        personInstanceJohn
        // a disallowed type inside my array prop
        // ,"a"
      ]}
      onMutateModelName={
        // ======= Change This String: Demonstrate Curried Function Param Validation =======
        mutationHandler("name")
      }
      onMutateModelAge={mutationHandler("age")}
    />
  );
}

export default App;
