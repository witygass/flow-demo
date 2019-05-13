// ======= Comment this line at end and run flow =======
// @flow

import React from "react";
import MyComponent from "./MyComponent";
import "./App.css";

import type {
  PersonType,
  SlimPersonType,
  DetailedPersonType
} from "./PersonType";

// Change both people to "PersonType" - show that flow can infer type
const slimPersonJohn: PersonType = {
  // ======= Comment Any of These Properties: Demonstrate Object / Variable Property Validation =======
  type: "slimPerson",
  name: "John",
  birthday: new Date("2/2/1990"),
  age: 25
};

const detailedPersonJane: PersonType = {
  type: "detailedPerson",
  name: "Jane",
  birthday: new Date("2/2/1990"),
  age: 25,
  address: { street: "Meme Street", number: 711 }
};

// ======= Naive Example of Property Assignment Handler =======
const mutationHandler = (property: "name" | "age") => newValue => {
  if (property === "age") {
    slimPersonJohn[property] = Number(newValue);
  } else if (property === "name") {
    slimPersonJohn[property] = String(newValue);
  }

  // ======= Uncomment: Demonstrate types incompatibility (newValue is an "any" type by default ->
  // because property could go into age or name props on the modelIstance, this is not okay
  // slimPersonJohn[property] = newValue;

  // ======= Comment This Line: Demonstrate Return Type Validation =======
  return slimPersonJohn;
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
      myCustomObject={slimPersonJohn}
      aListItem="one"
      anArrayOfMyModelObjects={[
        slimPersonJohn,
        // as you can see, the more detailed person (including an address property) is still a person
        detailedPersonJane
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
