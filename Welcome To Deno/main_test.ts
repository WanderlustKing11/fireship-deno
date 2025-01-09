// import { assertEquals } from "@std/assert";
// import { add } from "./main.ts";

// Deno.test(function addTest() {
//   assertEquals(add(2, 3), 5);
// });

import { expect } from "jsr:@std/expect"
import { multiply } from "./lib.ts"
import { assertEquals, assertNotMatch, assertExists, assertMatch, assertGreater  } from "@std/assert"

// Simple Test
Deno.test(function multiplyTest() {
  assertEquals(multiply(2, 2), 4);
  assertEquals(multiply(2, 3), 6);
});

// Alternative Test using 'expect'. Provides assertion functions
Deno.test("multiply test", () => {
  expect(multiply(2, 3)).toBe(6);
});

// Async Promise to mock data and resolve at later time.
// Makes it easy to test async operations.
Deno.test("mock API call", async () => {
  const mockApi = () => Promise.resolve("mock data");
  const result = await mockApi();
  assertEquals(result, "mock data");
});

// Real world application with multiple tests
// Provides test context inside the callback function as (t)
Deno.test("database lib", async (t) => {
  // Setup Logic
  const db = new Map()  // In this case we're using a map to simulate a database

  await t.step("db exists", () => {
    assertExists(db)
  });

  await t.step("insert user", () => {
    db.set('user', 'doug');

    assertGreater(db.size, 0)
    assertMatch(db.get('user'), /doug/)
    assertNotMatch(db.get('user'), /Bob/)
  });
});