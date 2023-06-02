const {
  getAllUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require("../../services/userService");
const userDb = require("../../db/userDb");
const { ExitStatus } = require("typescript");

jest.mock("../../db/userDb");

describe("Get All USers Service", () => {
  it("should return all users", async () => {
    // Arrange
    const user = "user";
    const query = {};

    const expectedUserList = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    userDb.getAllUsersDb.mockResolvedValue({
      users: expectedUserList,
    });

    // Act
    const result = await getAllUsersService(user, query);

    // Assert
    expect(userDb.getAllUsersDb).toHaveBeenCalledWith(user, query);
    expect(result.users).toEqual(expectedUserList);
  });

  it("should handle errors ", async () => {
    const user = "user";
    const query = {};

    const expectedErrorMessage = "500";
    userDb.getAllUsersDb.mockRejectedValue(new Error(expectedErrorMessage));

    // Act
    await expect(getAllUsersService(user, query)).rejects.toThrow(
      new Error(expectedErrorMessage)
    );

    // Assert
    expect(userDb.getAllUsersDb).toHaveBeenCalledWith(user, query);
  });
});

describe("Create User Service", () => {
  test("create a user", async () => {
    const body = {
      first_name: "ronald",
      last_name: "mcdonald",
    };
    const expectedResults = {
      message: "Successfully saved!",
      id: 123,
      affectedRows: 1,
    };
    userDb.createUserDb.mockResolvedValue(expectedResults);

    const result = await createUserService(body);

    expect(userDb.createUserDb).toHaveBeenCalledWith(body);
    expect(result).toEqual(expectedResults);
  });

  test("error handling on create user", async () => {
    const body = {
        first_name: "ronald",
        last_name: "mcdonald",
      };

    const expectedStatusCode = 500;
    const expectedError = new Error(expectedStatusCode);
    expectedError.statusCode = expectedStatusCode;
    userDb.createUserDb.mockRejectedValue(expectedError);

    await expect(createUserService(body)).rejects.toThrowError(expectedError);

    expect(userDb.createUserDb).toHaveBeenCalledWith(body);
  });
});

describe("Update User Service", () => {
  test("updates user info using userid", async () => {
    const body = {
      first_name: "John",
      last_name: "Doe",
    };
    const id = 123;

    const expectedResults = {
      message: "Successfully Updated User",
      affectedRows: 1,
    };
    userDb.updateUserDb.mockResolvedValue(expectedResults);

    const result = await updateUserService(body, id);

    expect(userDb.updateUserDb).toHaveBeenCalledWith(body, id);
    expect(result).toEqual(expectedResults);
  });

  test("error handling on updating user", async () => {
    const body = {
      first_name: "John",
      last_name: "Doe",
    };
    const id = 123;

    const expectedStatusCode = 500;
    const expectedError = new Error(expectedStatusCode);
    expectedError.statusCode = expectedStatusCode;
    userDb.updateUserDb.mockRejectedValue(expectedError);

    await expect(updateUserService(body, id)).rejects.toThrowError(
      expectedError
    );
    expect(userDb.updateUserDb).toHaveBeenCalledWith(body, id);
  });
});

describe("Delete User Service", () => {
  test("deletes a user using userid", async () => {
    const id = 1;

    const expectedResults = {
      message: "Successfully deleted user.",
      affectedRows: 1,
    };
    userDb.deleteUserDb.mockResolvedValue(expectedResults);

    const result = await deleteUserService(id);

    expect(userDb.deleteUserDb).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResults);
  });

  test("error handling when deleting users", async () => {
    const id = 1;

    const expectedStatusCode = 500;
    const expectedError = new Error(expectedStatusCode);
    expectedError.statusCode = expectedStatusCode;
    userDb.deleteUserDb.mockRejectedValue(expectedError);

    await expect(deleteUserService(id)).rejects.toThrowError(expectedError);
    expect(userDb.deleteUserDb).toHaveBeenCalledWith(id);
  });
});
