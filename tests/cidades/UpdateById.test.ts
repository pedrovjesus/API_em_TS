import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("cidades - update by id", () => {
  it("Atualizar atraves do registro", async () => {
    const resposta = await testServer
      .post("/cidades")
      .send({ nome: "caxinha" });

    expect(resposta.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cidades/${resposta.body}`)
      .send({ nome: "caxita" });
      
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    expect(resAtualizada.body).toHaveProperty("nome");
  });
  it("tenta atualizar um regitro não existente", async () => {
    const res = await testServer.get("/cidades/9999").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
