const {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../../controllers/usersController");
const userService = require("../../services/userService");

describe("Get All User Controller", () => {
  test("returns all user", async () => {
    // Arrange
    const req = { user: "user", query: {} };
    const expectedResults = [
      { id: 1, first_name: "John", last_name: "Doe" },
      { id: 2, first_name: "Jane", last_name: "Doe" },
    ];

    const getAllUsersServiceMock = jest
      .spyOn(userService, "getAllUsersService")
      .mockResolvedValue(expectedResults);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Act
    await getAllUsersController(req, res);

    // Assert
    expect(getAllUsersServiceMock).toHaveBeenCalledWith(req.user, req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResults);

    getAllUsersServiceMock.mockRestore();
  });

  // For Error testing
  test("return an error and error status code", async () => {
    const req = { user: "user", query: {} };
    const expectedErrorMessage = "Internal Server Error";
    const getAllUsersServiceMock = jest
      .spyOn(userService, "getAllUsersService")
      .mockRejectedValue(new Error(expectedErrorMessage));
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllUsersController(req, res);

    expect(getAllUsersServiceMock).toHaveBeenCalledWith(req.user, req.query);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });

    getAllUsersServiceMock.mockRestore();
  });
});

describe("Create User Controller", () => {
  test("creates a new user", async () => {
    // Arrange
    const req = { body: { first_name: "Andrei", last_name: "Valencia" } };
    const expectedResults = {
      id: 1,
      first_name: "Andrei",
      last_name: "Valencia",
    };

    const createUserServiceMock = jest
      .spyOn(userService, "createUserService")
      .mockResolvedValue(expectedResults);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Act
    await createUserController(req, res);

    // Assert
    expect(createUserServiceMock).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResults);

    createUserServiceMock.mockRestore();
  });

  // For Error testing
  test("return an error and error status code", async () => {
    const req = { body: { first_name: "Andrei", last_name: "Valencia" } };
    const expectedErrorMessage = "Name already exists";
    const createUserServiceMock = jest
      .spyOn(userService, "createUserService")
      .mockRejectedValue(new Error(expectedErrorMessage));
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUserController(req, res);

    expect(createUserServiceMock).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });

    createUserServiceMock.mockRestore();
  });
});

describe("Update User Controller", () => {
  test("updates a new user with the userId", async () => {
    // Arrange
    const req = {
      params: { id: 1 },
      body: { first_name: "Joshua", last_name: "Valencia" },
    };
    const expectedResults = {
      id: 1,
      first_name: "Joshua",
      last_name: "Valencia",
    };

    const updateUserServiceMock = jest
      .spyOn(userService, "updateUserService")
      .mockResolvedValue(expectedResults);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Act
    await updateUserController(req, res);

    // Assert
    expect(updateUserServiceMock).toHaveBeenCalledWith(req.body, req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResults);

    updateUserServiceMock.mockRestore();
  });

  // For Error testing
  test("return an error and error status code", async () => {
    const req = {
      body: { first_name: "Andrei", last_name: "Valencia" },
      params: { id: 1 },
    };
    const expectedErrorMessage = "User not found";
    const updateUserServiceMock = jest
      .spyOn(userService, "updateUserService")
      .mockRejectedValue(new Error(expectedErrorMessage));
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateUserController(req, res);

    expect(updateUserServiceMock).toHaveBeenCalledWith(req.body, req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });

    updateUserServiceMock.mockRestore();
  });
});

describe("Delete User Controller", () => {
  test("it should delete the user", async () => {
    // Arrange
    const req = { params: { id: 1 } };
    const expectedResults = { message: "User deleted successfully" };
    const deleteUserServiceMock = jest
      .spyOn(userService, "deleteUserService")
      .mockResolvedValue(expectedResults);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Act
    await deleteUserController(req, res);

    // Assert
    expect(deleteUserServiceMock).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResults);

    deleteUserServiceMock.mockRestore();
  });

  test("return error and status code", async () => {
    const req = { params: { id: 123 } };
    const expectedErrorMessage = "User not found";
    const deleteUserServiceMock = jest
      .spyOn(userService, "deleteUserService")
      .mockRejectedValue(new Error(expectedErrorMessage));
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUserController(req, res);

    expect(deleteUserServiceMock).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });

    deleteUserServiceMock.mockRestore();
  });
});
