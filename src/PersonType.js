// @flow

type Address = {
  street: string,
  number: number
};

type basicPersonProperties = {
  name: string,
  age: number,
  birthday: Date
};

type SlimPersonType = basicPersonProperties & {
  type: "slimPerson"
};

// This is an form of type inheretance for flow (can be used for various JSON blobs depending on route)
// also use this to demonstrate safe navigation
type DetailedPersonType = basicPersonProperties & {
  type: "detailedPerson",
  address: Address
};

type PersonType = SlimPersonType | DetailedPersonType;

export type { PersonType, SlimPersonType, DetailedPersonType };
