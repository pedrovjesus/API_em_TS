import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuarios - sing up", () => {
  it("Cria usuario 1", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "Pedro victor",
      email: "aaaatest@gmail.com",
      senha: "1324648315165",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Cria usuario 2", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "Pedro vic2tor",
      email: "aaaads@gmail.com",
      senha: "1324648315165",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com nome curto", async () => {
    const res1 = await testServer.post("/entrar").send({
      nome: "Cx",
      email: "aaaads@gmail.com",
      senha: "1324648315165",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body");
  });
  it("Tenta criar um registro com email invalido", async () => {
    const res1 = await testServer.post("/entrar").send({
      nome: "Cx",
      email: "aaaa gmail.com",
      senha: "1324648315165",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body");
  });
  it("Tenta criar um registro com senha curta", async () => {
    const res1 = await testServer.post("/entrar").send({
      nome: "Cx",
      email: "aaaa@gmail.com",
      senha: "1324",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body");
  });
  it("Tenta criar um registro sem nome", async () => {
    const res1 = await testServer.post("/entrar").send({
      //  nome: "",
      email: "aaaa@gmail.com",
      senha: "1324648315165",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body");
  });
  it("Tenta criar um registro sem email", async () => {
    const res1 = await testServer.post("/entrar").send({
      nome: "sdasdasdsa",
      //  email: "",
      senha: "1324648315165",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body");
  });
  it("Tenta criar um registro sem senha", async () => {
    const res1 = await testServer.post("/entrar").send({
      nome: "1243245",
      email: "aaaa@gmail.com",
      // senha: "",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body");
  });
});
