// @flow

import * as React from "react";
import "./App.css";

import type { PersonType } from "./PersonType";

type MyComponentProps = {
  anInt: number,
  aString: string,
  aListItem: ?("one" | "of" | "these"),
  aJsxElement: React.Element<"div">,
  // ======= Change To Array<?PersonType> to Demonstrate Type Expectation Inconsistency =======
  anArrayOfMyModelObjects: Array<PersonType>,
  // ======= Talk about function typing and currying =======
  onMutateModelName: (value: string) => PersonType,
  onMutateModelAge: (value: number) => PersonType
};

export default class MyComponent extends React.Component<MyComponentProps> {
  myMethod(s: string, i: number, arr: Array<PersonType>) {
    return String([s, i, arr]);
  }

  // We're not even calling this method yet.. still works
  methodThatTakesMyModelObjectAndMutatesIt(
    aModelInstance: PersonType,
    modelArr: Array<PersonType>
  ) {
    // ======= A Proper Assignment =======
    aModelInstance.name = "Steve";

    // ======= An Improper Assignment / Mutation =======
    let anIntyLookingString = 5;
    // anIntyLookingString = JSON.stringify(anIntyLookingString);
    aModelInstance.age = anIntyLookingString;
    // aModelInstance.age = "a";
    // Assignment To Unspecified Prop
    // aModelInstance.undefinedProp = "anyOldValue";
    // ======= Undefined Property ======= (enable ?any typing above and demonstrate)
    // aModelInstance.moreDetailedProp = "any old value";
    // ======= Access POSSIBLY Undefined Prop =======
    modelArr.map(el => {
      // el.address.street;
      // access inside of a refinement
      if (el.type === "detailedPerson") {
        el.address.street;
      }
    });
  }

  render() {
    // ======= An Undefined React Prop =======
    // const { aPropIDidntDefine } = this.props;
    const { anInt, aString, anArrayOfMyModelObjects } = this.props;

    // ======= Pass A Disallowed Value To Function =======
    return <div>{this.myMethod(aString, anInt, anArrayOfMyModelObjects)}</div>;
  }
}
