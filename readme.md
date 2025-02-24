# mock-ql-sculptor

mock-ql-sculptor is a powerful npm library that transforms GraphQL queries into mock data. It's designed to help developers quickly generate realistic test data based on their GraphQL schema, streamlining the development and testing process for GraphQL-based applications.

## Features

- Parse GraphQL queries and generate corresponding mock data
- Support for nested fields and complex query structures
- Customizable mock data generation
- Command-line interface (CLI) for quick mock data generation from GraphQL files
- Built with the latest ES features, including top-level await, arrow functions, and destructuring
- Control numerosity with the 'count' parameter for multiple items
- Define numeric fields with specific constraints using the 'number' type

## Installation

Install mock-ql-sculptor using npm:

```bash
npm install mock-ql-sculptor
```

## Usage

### As a Library

```javascript
import generateMockData from "mock-ql-sculptor";

// Basic query
const query = `
  query {
    user {
      id
      name
      email
      age
    }
  }
`;

const mockData = generateMockData(query);
console.log(mockData);

// Query with count parameter
const queryWithCount = `
  query {
    users(count: 10) {
      id
      name
      email
    }
  }
`;

const mockDataWithCount = generateMockData(queryWithCount);
console.log(mockDataWithCount); // Will generate an array of 10 users

// Query with number type constraints
const queryWithNumberConstraints = `
  query {
    users {
      id(number: {min: 1, max: 10, float: false})
      name
    }
  }
`;

const mockDataWithNumberConstraints = generateMockData(
  queryWithNumberConstraints
);
console.log(mockDataWithNumberConstraints); // Will generate users with integer IDs between 1 and 10
```

### Using the CLI

You can use mock-ql-sculptor directly from the command line:

```bash
npx mock-ql-sculptor path/to/your/query.graphql
```

This will output the generated mock data as JSON to the console.

## API Documentation

### `generateMockData(query: string): object`

Generates mock data based on the provided GraphQL query string.

- `query`: A string containing a valid GraphQL query
- Returns: An object containing mock data that matches the structure of the query

#### Supported Features

1. **Count Parameter**: Use `count` to specify the number of items to generate for a field.

   ```graphql
   query {
     users(count: 10) {
       id
       name
     }
   }
   ```

2. **Number Type Constraints**: Use the `number` type to specify constraints for numeric fields.

   ```graphql
   query {
     users {
       id(number: { min: 1, max: 100, float: false })
     }
   }
   ```

   - `min`: The minimum value (inclusive)
   - `max`: The maximum value (inclusive)
   - `float`: Set to `true` for floating-point numbers, `false` for integers

## Testing

To run the tests for mock-ql-sculptor, use the following command:

```bash
npm test
```

This will run both the library tests and the CLI tests.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
