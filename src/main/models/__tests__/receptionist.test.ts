import { prismaMock } from "../../../helpers/singleton";
import { Receptionist } from "@prisma/client";
import ReceptionistModel from "../receptionist.model";

const MOCKED_RECEPTIONISTS: Receptionist[] = [
  {
    id: 1,
    name: "Recepcionista 1",
    cpf: "81409455017",
    user_id: 1,
  },
  {
    id: 2,
    name: "Recepcionista 2",
    cpf: "52398363023",
    user_id: 2,
  },
];

describe("Receptionist Model Tests", () => {
  it("retrieveReceptionists should return all registered receptionists", async () => {
    const receptionistModel = new ReceptionistModel();
    prismaMock.receptionist.findMany.mockResolvedValue(MOCKED_RECEPTIONISTS);

    const result = await receptionistModel.retrieveReceptionists();

    expect(result).toEqual(MOCKED_RECEPTIONISTS);
  });

  it("retrieveReceptionistById should return an receptionist with the selected ID", async () => {
    const receptionistModel = new ReceptionistModel();
    prismaMock.receptionist.findUnique.mockResolvedValue(
      MOCKED_RECEPTIONISTS[0]
    );

    const result = await receptionistModel.retrieveReceptionistById(
      MOCKED_RECEPTIONISTS[0].id
    );

    expect(result).toEqual(MOCKED_RECEPTIONISTS[0]);
  });

  it("deleteReceptionist should return the deleted receptionist", async () => {
    const receptionistModel = new ReceptionistModel();
    prismaMock.receptionist.delete.mockResolvedValue(MOCKED_RECEPTIONISTS[0]);

    const result = await receptionistModel.deleteReceptionist(
      MOCKED_RECEPTIONISTS[0].id
    );

    expect(result).toBe(MOCKED_RECEPTIONISTS[0]);
  });

  it("createReceptionist should return the created receptionist", async () => {
    const receptionistModel = new ReceptionistModel();
    prismaMock.receptionist.create.mockResolvedValue(MOCKED_RECEPTIONISTS[0]);

    const result = await receptionistModel.createReceptionist(
      MOCKED_RECEPTIONISTS[0]
    );

    expect(result).toBe(MOCKED_RECEPTIONISTS[0]);
  });

  it("editReceptionist should return the updated receptionist", async () => {
    const receptionistModel = new ReceptionistModel();
    const expectedResult = {
      ...MOCKED_RECEPTIONISTS[0],
      name: "Novo Recepcionista",
    };
    prismaMock.receptionist.update.mockResolvedValue(expectedResult);

    const result = await receptionistModel.editReceptionist(1, expectedResult);

    expect(result).toBe(expectedResult);
  });
});
