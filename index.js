import gql from "graphql-tag";
import { faker } from "@snaplet/copycat";

const generateMockData = (query) => {
  const parsedQuery = gql(query);
  return mockQueryFields(parsedQuery.definitions[0].selectionSet.selections);
};

const mockQueryFields = (fields) => {
  const result = {};

  for (const field of fields) {
    const { name, selectionSet } = field;

    if (selectionSet) {
      result[name.value] = mockQueryFields(selectionSet.selections);
    } else {
      result[name.value] = mockScalarField(name.value);
    }
  }

  return result;
};

const mockScalarField = (fieldName) => {
  switch (fieldName.toLowerCase()) {
    case "id":
      return faker.random.uuid();
    case "name":
      return faker.name.findName();
    case "email":
      return faker.internet.email();
    case "age":
      return faker.datatype.number({ min: 18, max: 99 });
    default:
      return faker.lorem.word();
  }
};

export default generateMockData;
