import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidade - get by id", () => {
  it("Buscar registro por id", async () => {
    const resposta = await testServer
      .post("/cidades")
      .send({ nome: "caxinha" });

      expect(resposta.statusCode).toEqual(StatusCodes.CREATED)

    const resBuscada = await testServer.get(`/cidades/${resposta.body}`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");

    expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
  });
  it("tenta buscar registro que nao existe", async () => {
    const resposta = await testServer.get("/cidades/9999").send();

    expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta.body).toHaveProperty("errors.default");
  });
});
