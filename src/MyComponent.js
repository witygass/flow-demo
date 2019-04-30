// @flow

import * as React from "react";
import "./App.css";

import type { MyPersonType, MoreDetailedPersonType } from "./MyPersonType";

type MyComponentProps = {
  anInt: number,
  aString: string,
  aListItem: ?("one" | "of" | "these"),
  aJsxElement: React.Element<"div">,
  // ======= Change To Array<?MyPersonType> to Demonstrate Type Expectation Inconsistency =======
  anArrayOfMyModelObjects: Array<MyPersonType>,
  // ======= Talk about function typing and currying =======
  onMutateModelName: (value: string) => MyPersonType,
  onMutateModelAge: (value: number) => MyPersonType
};

export default class MyComponent extends React.Component<MyComponentProps> {
  myMethod(s: string, i: number, arr: Array<MyPersonType>) {
    return String([s, i, arr]);
  }

  // We're not even calling this method yet.. still works
  methodThatTakesMyModelObjectAndMutatesIt(aModelInstance: MyPersonType) {
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
    // ======= Access Undefined Prop =======
    // console.log(aModelInstance.meme);
  }

  render() {
    // ======= An Undefined React Prop =======
    // const { aPropIDidntDefine } = this.props;
    const { anInt, aString, anArrayOfMyModelObjects } = this.props;

    // ======= Pass A Disallowed Value To Function =======
    return <div>{this.myMethod(aString, anInt, anArrayOfMyModelObjects)}</div>;
  }
}

export type { MyPersonType };
