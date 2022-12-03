import { prismaMock } from "../../../helpers/singleton";
import UserModel from "../user.model";
import { User } from "@prisma/client";

const MOCKED_USERS: User[] = [
  {
    id: 1,
    name: "Caio César",
    role: "DOCTOR",
  },
  {
    id: 2,
    name: "Recepcionista 1",
    role: "RECEPTIONIST",
  },
];

describe("User Model Tests", () => {
  it("retrieveUsers method should return all registered users", async () => {
    const userModel = new UserModel();
    prismaMock.user.findMany.mockResolvedValue(MOCKED_USERS);

    const result = await userModel.retrieveUsers();

    expect(result).toEqual(MOCKED_USERS);
  });

  it("retrieveUserById should return an user with the selected ID", async () => {
    const userModel = new UserModel();
    prismaMock.user.findUnique.mockResolvedValue(MOCKED_USERS[0]);

    const result = await userModel.retrieveUserById(MOCKED_USERS[0].id);

    expect(result).toEqual(MOCKED_USERS[0]);
  });

  it("deleteUser should return the deleted user", async () => {
    const userModel = new UserModel();
    prismaMock.user.delete.mockResolvedValue(MOCKED_USERS[0]);

    const result = await userModel.deleteUser(MOCKED_USERS[0].id);

    expect(result).toBe(MOCKED_USERS[0]);
  });

  it("createUser should return the created user", async () => {
    const userModel = new UserModel();
    prismaMock.user.create.mockResolvedValue(MOCKED_USERS[0]);

    const result = await userModel.createUser(MOCKED_USERS[0]);

    expect(result).toBe(MOCKED_USERS[0]);
  });

  it("editUser should return the updated user", async () => {
    const userModel = new UserModel();
    const expectedResult = {
      ...MOCKED_USERS[0],
      name: "Pedro",
    };
    prismaMock.user.update.mockResolvedValue(expectedResult);

    const result = await userModel.editUser(1, expectedResult);

    expect(result).toBe(expectedResult);
  });
});
