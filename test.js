import { test } from "node:test";
import assert from "node:assert";
import generateMockData from "./index.js";

test("generateMockData generates mock data for a simple query", async (t) => {
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

  const result = generateMockData(query);

  assert.ok(result.user);
  assert.ok(typeof result.user.id === "string");
  assert.ok(typeof result.user.name === "string");
  assert.ok(typeof result.user.email === "string");
  assert.ok(typeof result.user.age === "number");
});

test("generateMockData handles nested fields", async (t) => {
  const query = `
    query {
      user {
        id
        name
        address {
          street
          city
          country
        }
      }
    }
  `;

  const result = generateMockData(query);

  assert.ok(result.user);
  assert.ok(typeof result.user.id === "string");
  assert.ok(typeof result.user.name === "string");
  assert.ok(result.user.address);
  assert.ok(typeof result.user.address.street === "string");
  assert.ok(typeof result.user.address.city === "string");
  assert.ok(typeof result.user.address.country === "string");
});

test("generateMockData handles count parameter for multiple users", async (t) => {
  const query = `
    query {
      users(count: 10) {
        id
        name
        email
      }
    }
  `;

  const result = generateMockData(query);

  assert.ok(Array.isArray(result.users));
  assert.strictEqual(result.users.length, 10);
  result.users.forEach((user) => {
    assert.ok(typeof user.id === "string");
    assert.ok(typeof user.name === "string");
    assert.ok(typeof user.email === "string");
  });
});

test("generateMockData handles number type with min and max", async (t) => {
  const query = `
    query {
      users {
        id(number:{min:1, max:10, float:false})
        name
      }
    }
  `;

  const result = generateMockData(query);

  assert.ok(Array.isArray(result.users));
  result.users.forEach((user) => {
    assert.ok(Number.isInteger(user.id));
    assert.ok(user.id >= 1 && user.id <= 10);
    assert.ok(typeof user.name === "string");
  });
});
