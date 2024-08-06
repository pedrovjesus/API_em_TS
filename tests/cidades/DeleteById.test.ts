import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - delete by Id", () => {
  it("Apaga registro", async () => {
    const resposta = await testServer
      .post("/cidades")
      .send({ nome: "caxinha" });

    expect(resposta.statusCode).toEqual(StatusCodes.CREATED);

    const respostaApagada = await testServer
      .delete(`/cidades/${resposta.body}`)
      .send();

    expect(respostaApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Apaga que não existe", async () => {
    const resposta = await testServer.delete("/cidades/9999").send();

    expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta.body).toHaveProperty("errors.default");
  });
});
