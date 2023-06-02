const {
  getAllUsersDb,
  createUserDb,
  updateUserDb,
  deleteUserDb,
} = require("../../db/userDb");
const promiseQuery = require("../../helpers/promiseQuery");

jest.mock("../../helpers/promiseQuery");

describe("Get All Users Database", () => {
  it("return all users", async () => {
    // Prepare
    const user = "user";
    const query = {};

    // Mock the promiseQuery module to return a sample user list
    const expectedUserList = [
      { id: 1, name: "Mark" },
      { id: 2, name: "Brand" },
    ];
    promiseQuery.promiseQueryFunc.mockResolvedValue(expectedUserList);

    // Act
    const result = await getAllUsersDb(user, query);

    // Assert
    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "SELECT * FROM users",
      []
    );
    expect(result.users).toEqual(expectedUserList);
  });

  it("should handle errors during database query", async () => {
    // Arrange
    const user = "user";
    const query = {};

    const expectedErrorMessage = "Database error";
    promiseQuery.promiseQueryFunc.mockRejectedValue(
      new Error(expectedErrorMessage)
    );

    // Act
    await expect(getAllUsersDb(user, query)).rejects.toThrow(
      expectedErrorMessage
    );
    // Assert
    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "SELECT * FROM users",
      []
    );
  });
});

describe("Create User Database", () => {
  test("should create a user", async () => {
    // Arrange
    const body = {
      first_name: "Andrei",
      last_name: "Valencia",
    };

    const insertId = 123;
    const affectedRows = 1;
    promiseQuery.promiseQueryFunc.mockResolvedValue({
      insertId,
      affectedRows,
    });

    //   Act
    const result = await createUserDb(body);

    // Assert
    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "INSERT INTO users (first_name, last_name) VALUES (?,?)",
      ["Andrei", "Valencia"]
    );
    expect(result.message).toEqual("Successfully saved!");
    expect(result.id).toEqual(insertId);
    expect(result.affectedRows).toEqual(affectedRows);
  });

  test("handling errors", async () => {
    const body = {
      first_name: "Andrei",
      last_name: "Valencia",
    };

    const expectedErrorMessage = "Database error";
    promiseQuery.promiseQueryFunc.mockRejectedValue(
      new Error(expectedErrorMessage)
    );

    await expect(createUserDb(body)).rejects.toThrow(expectedErrorMessage);

    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "INSERT INTO users (first_name, last_name) VALUES (?,?)",
      ["Andrei", "Valencia"]
    );
  });
});

describe("Update User Database", () => {
  test("update a user info using userId", async () => {
    const body = {
      first_name: "Andrei",
      last_name: "Valencia",
    };
    const id = 1;
    const affectedRows = 1;
    promiseQuery.promiseQueryFunc.mockResolvedValue({
      affectedRows,
    });

    const result = await updateUserDb(body, id);

    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "UPDATE users SET first_name = ?, last_name = ? WHERE users.id = ?",
      ["Andrei", "Valencia", 1]
    );
    expect(result.message).toEqual("Successfully Updated User");
    expect(result.affectedRows).toEqual(affectedRows);
  });

  test("error handling on database", async () => {
    const body = {
      first_name: "Andrei",
      last_name: "Valencia",
    };
    const id = 1;

    const expectedErrorMessage = "Database error";
    promiseQuery.promiseQueryFunc.mockRejectedValue(
      new Error(expectedErrorMessage)
    );

    await expect(updateUserDb(body, id)).rejects.toThrow(expectedErrorMessage);

    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "UPDATE users SET first_name = ?, last_name = ? WHERE users.id = ?",
      ["Andrei", "Valencia", 1]
    );
  });
});

describe("Delete User Database", () => {
  test("deletes a user from database using userid", async () => {
    const id = 1;

    const affectedRows = 1;
    promiseQuery.promiseQueryFunc.mockResolvedValue({
      affectedRows,
    });

    const result = await deleteUserDb(id);

    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "DELETE FROM users WHERE id = ?",
      1
    );
    expect(result.message).toEqual("Successfully deleted user.");
    expect(result.affectedRows).toEqual(affectedRows);
  });

  test("error handling when deleting user from database", async () => {
    const id = 1;
    const expectedErrorMessage = "Database error";
    promiseQuery.promiseQueryFunc.mockRejectedValue(
      new Error(expectedErrorMessage)
    );

    await expect(deleteUserDb(id)).rejects.toThrow(expectedErrorMessage);

    expect(promiseQuery.promiseQueryFunc).toHaveBeenCalledWith(
      "DELETE FROM users WHERE id = ?",
      1
    );
  });
});
