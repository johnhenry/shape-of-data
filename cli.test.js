import { test } from "node:test";
import assert from "node:assert";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";

const execAsync = promisify(exec);

test("CLI generates mock data for a GraphQL file", async (t) => {
  // Create a temporary GraphQL file
  const tempFileName = "temp_test.graphql";
  const graphqlContent = `
    query {
      user {
        id
        name
        email
      }
    }
  `;
  await fs.writeFile(tempFileName, graphqlContent);

  try {
    // Run the CLI command
    const { stdout, stderr } = await execAsync(`node cli.js ${tempFileName}`);

    // Check if there's no error output
    assert.strictEqual(stderr, "");

    // Parse the output JSON
    const result = JSON.parse(stdout);

    // Assert the structure of the mock data
    assert.ok(result.user);
    assert.ok(typeof result.user.id === "string");
    assert.ok(typeof result.user.name === "string");
    assert.ok(typeof result.user.email === "string");
  } finally {
    // Clean up the temporary file
    await fs.unlink(tempFileName);
  }
});

test("CLI handles errors gracefully", async (t) => {
  // Test with a non-existent file
  const { stderr } = await execAsync("node cli.js non_existent_file.graphql");
  assert.ok(stderr.includes("Error:"));
});

test("CLI shows usage information when no file is provided", async (t) => {
  const { stderr } = await execAsync("node cli.js");
  assert.ok(stderr.includes("Please provide a GraphQL file as an argument."));
});
