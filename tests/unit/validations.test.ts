import { expect, test } from "vitest";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validations";

// Validate Emails
test("validates emails returns true for correct value", () => {
  const isEmailValid = validateEmail("test@example.com");
  expect(isEmailValid).toBe(true);
});

test("validates emails returns false for incorrect value", () => {
  const isEmailValid = validateEmail("testexample.com");
  expect(isEmailValid).toBe(false);
});

test("validates emails returns false for non string value", () => {
  const isEmailValid = validateEmail(1);
  expect(isEmailValid).toBe(false);
});

// Validate Password
test("validates password returns true for valid password", () => {
  const isPasswordValid = validatePassword("12345678");
  expect(isPasswordValid).toBe(true);
});

test("validates password returns false for empty password", () => {
  const isPasswordValid = validatePassword("");
  expect(isPasswordValid).toBe(false);
});

test("validates password returns false for non string password", () => {
  const isPasswordValid = validatePassword(12344);
  expect(isPasswordValid).toBe(false);
});

// Validate Name
test("validates name returns true for valid name", () => {
  const isNameValid = validateName("John Doe");
  expect(isNameValid).toBe(true);
});

test("validates name returns false for empty name", () => {
  const isNameValid = validateName("");
  expect(isNameValid).toBe(false);
});

test("validates name returns false for non string name", () => {
  const isNameValid = validateName(12344);
  expect(isNameValid).toBe(false);
});
