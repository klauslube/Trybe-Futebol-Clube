import * as sinon from "sinon";
import * as chai from "chai";
import * as mocha from "mocha";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import Match from "../database/models/Match";

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
  },
];

const match = {
  inProgress: true,
  id: 52,
  homeTeam: 8,
  awayTeam: 9,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const sameTeamMatch = {
  inProgress: true,
  id: 52,
  homeTeam: 8,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const fakeTeamMatch = {
  inProgress: true,
  id: 52,
  homeTeam: 99999,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const updateGoalsMatch = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

const loginMock = {
  email: "admin@admin.com",
  password: "secret_admin",
};

describe.only("Deve testar os metodos na rota /matches", () => {
  let chaiHttpResponse: Response;
  describe("metodo GET", () => {
    before(() => {
      sinon.stub(Match, "findAll").resolves(matchesMock as any);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it("Deve retornar status 200 e todas as partidas em caso de sucesso", async () => {
      chaiHttpResponse = await chai.request(app).get("/matches");

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.eql(matchesMock);
    });

    it("Deve retornar status 200 e todas as partidas em andamento", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches?inProgress=true");
      console.log(chaiHttpResponse.body);

      expect(chaiHttpResponse.status).to.be.eq(200);
      // expect(chaiHttpResponse.body[0]).to.have.key('inProgress');
    });

    it("Deve retornar status 200 e todas as partidas que não estão em andamento", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/matches?inProgress=false");
      // console.log(chaiHttpResponse.body[0]);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body[0].inProgress).to.be.eq(false);
    });
  });

  describe("metodo POST", () => {
    before(() => {
      sinon.stub(Match, "create").resolves(match as any);
    });

    after(() => {
      (Match.create as sinon.SinonStub).restore();
    });

    it("Deve retornar status 201 e partida criada", async () => {
      let response: Response;
      response = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email, password: loginMock.password });

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send(match)
        .set("Authorization", response.body.token);

      expect(chaiHttpResponse.status).to.be.eq(201);
      expect(chaiHttpResponse.body).to.be.eql(match);
    });

    it("Deve retornar status 401 e mensagem de erro ao tentar criar partida com dois id de times iguais", async () => {
      let response: Response;
      response = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email, password: loginMock.password });

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send(sameTeamMatch)
        .set("Authorization", response.body.token);

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "It is not possible to create a match with two equal teams"
      );
    });

    it("Deve retornar status 401 e messagem de erro ao tentar criar partida com um time inexistente", async () => {
      let response: Response;
      response = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email, password: loginMock.password });

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send(fakeTeamMatch)
        .set("Authorization", response.body.token);

      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "There is no team with such id!"
      );
    });

    it("Deve retornar status 401 e messagem de erro ao tentar criar partida com token inexistente", async () => {
      let response: Response;
      response = await chai
        .request(app)
        .post("/login")
        .send({ email: loginMock.email, password: loginMock.password });

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .send(fakeTeamMatch)
        .set("Authorization", "dadasda");

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eql(
        "Token must be a valid token"
      );
    });
  });

  describe("metodo PATCH", () => {
    before(() => {
      sinon.stub(Match, "update").resolves(match as any);
    });

    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });

    it("Deve retornar status 200 ao atualizar gols em uma partida em andamento", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/52")
        .send(updateGoalsMatch);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.message).to.be.eql("Match Goals updated");
    });

    it("Deve retornar status 200 e mensagem de termino ao alterar status de andamennto da partida", async () => {
      chaiHttpResponse = await chai.request(app).patch("/matches/52/finish");
      // console.log(chaiHttpResponse.body);

      expect(chaiHttpResponse.status).to.be.eq(200);
      // expect(chaiHttpResponse.body.inProgress).to.be.eq(false);
      expect(chaiHttpResponse.body.message).to.be.eql("Finished");
    });
  });
});
