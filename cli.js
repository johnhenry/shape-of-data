#!/usr/bin/env node

import fs from "fs/promises";
import generateMockData from "./index.js";

const main = async () => {
  const filename = process.argv[2];

  if (!filename) {
    console.error("Please provide a GraphQL file as an argument.");
    process.exit(1);
  }

  try {
    const query = await fs.readFile(filename, "utf-8");
    const mockData = generateMockData(query);
    console.log(JSON.stringify(mockData, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

main();
