import { describe, expect, test } from "vitest";
import { User } from "./user.entity";

describe("User entity", () => {
  test("Should be able to create a new user", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
    });
    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty("id");
    expect(user.password).not.equal("123456");
  });
});
