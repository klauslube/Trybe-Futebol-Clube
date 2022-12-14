import * as sinon from "sinon";
import * as chai from "chai";
import * as mocha from "mocha";
import * as jwt from "jsonwebtoken";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import User from "../database/models/User";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

const fakeUserMock = {
  username: "klaus",
  role: "tryber",
  email: "admin@fake.com",
  password: "secret_fake",
};

const userMock = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

const loginMock = {
  email: "admin@admin.com",
  password: "secret_admin",
};

describe("Deve testar os metodos na rota /login", () => {
  let chaiHttpResponse: Response;
  describe("metodo POST", () => {
    before(() => {
      sinon.stub(User, "findOne").resolves(userMock as User);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it("Deve retornar status 200 e um Token em caso de sucesso", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email, password: loginMock.password });

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.have.property("token");
    });

    it("Caso não enviado email, deve retornar status 400 e messagem de erro", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ password: loginMock.password });
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "All fields must be filled"
      );
    });

    it("Caso não enviado senha, deve retornar status 400 e messagem de erro", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email });
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "All fields must be filled"
      );
    });

    it("Caso enviado email invalido, deve retornar status 401 e messagem de erro", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: fakeUserMock.email, password: loginMock.password });
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "Incorrect email or password"
      );
    });

    it("Caso enviado senha invalida, deve retornar status 401 e messagem de erro", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email, password: fakeUserMock.password });
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "Incorrect email or password"
      );
    });
  });

  describe("Metodo GET", () => {
    describe("caso enviado token invalido", () => {
      before(() => {
        sinon.stub(User, "findOne").resolves(userMock as User);
        sinon.stub(jwt, "verify").resolves();
      });
      after(() => {
        (User.findOne as sinon.SinonStub).restore();
        (jwt.verify as sinon.SinonStub).restore();
      });

      it("Deve retornar status 401 e lançar erro caso não enviado token", async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get("/login/validate")
          .send();

        expect(chaiHttpResponse.status).to.be.eq(401);
        expect(chaiHttpResponse.body.message).to.be.eql(
          "Token must be a valid token"
        );
      });
    });

    describe("caso enviado token valido", () => {
      before(() => {
        sinon.stub(jwt, "verify").returns({role:userMock.role} as any);
        sinon.stub(User, "findOne").resolves(userMock as User);
      });
      after(() => {
        (jwt.verify as sinon.SinonStub).restore();
        (User.findOne as sinon.SinonStub).restore();
      });

      it("Deve retornar status 200 e um objeto contento a role do user", async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get("/login/validate")
          .set("Authorization", 'sdasdasda')
          .send();
        console.log(chaiHttpResponse.body);
        
        expect(chaiHttpResponse.status).to.be.eq(200);
        expect(chaiHttpResponse.body).to.be.eql({role: userMock.role});
      });
    });
  });
});
