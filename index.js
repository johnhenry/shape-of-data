import gql from "graphql-tag";
import { faker } from "@snaplet/copycat";

const generateMockData = (query) => {
  const parsedQuery = gql(query);
  return mockQueryFields(parsedQuery.definitions[0].selectionSet.selections);
};

const mockQueryFields = (fields) => {
  const result = {};

  for (const field of fields) {
    const { name, selectionSet, arguments: args } = field;

    if (selectionSet) {
      const count =
        args?.find((arg) => arg.name.value === "count")?.value.value || 1;
      if (name.value.toLowerCase() === "users") {
        // Always return an array for 'users' query
        result[name.value] = Array.from({ length: count }, () =>
          mockQueryFields(selectionSet.selections)
        );
      } else if (count > 1) {
        result[name.value] = Array.from({ length: count }, () =>
          mockQueryFields(selectionSet.selections)
        );
      } else {
        result[name.value] = mockQueryFields(selectionSet.selections);
      }
    } else {
      const numberArg = args?.find((arg) => arg.name.value === "number")?.value
        .fields;
      result[name.value] = mockScalarField(name.value, numberArg);
    }
  }

  return result;
};

const mockScalarField = (fieldName, numberArg) => {
  if (numberArg) {
    const min = numberArg.find((f) => f.name.value === "min")?.value.value;
    const max = numberArg.find((f) => f.name.value === "max")?.value.value;
    const isFloat =
      numberArg.find((f) => f.name.value === "float")?.value.value ?? true;

    if (isFloat) {
      return faker.number.float({ min, max, precision: 0.01 });
    } else {
      return faker.number.int({ min, max });
    }
  }

  switch (fieldName.toLowerCase()) {
    case "id":
      return faker.string.uuid();
    case "name":
      return faker.person.fullName();
    case "email":
      return faker.internet.email();
    case "age":
      return faker.number.int({ min: 18, max: 99 });
    default:
      return faker.word.sample();
  }
};

export default generateMockData;
