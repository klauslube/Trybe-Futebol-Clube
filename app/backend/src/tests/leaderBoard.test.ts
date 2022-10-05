import * as sinon from "sinon";
import * as chai from "chai";
import * as mocha from "mocha";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import Team from "../database/models/Team";
import { ILeaderboard, ITeamsWithMatches } from "../interfaces/ILeaderBoard";
import { allTeamWithMatches, homeBoard, awayBoard, allBoard } from "./mocks/teamMock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Deve testar os metodos na rota /leaderboard", () => {
  let chaiHttpResponse: Response;
  describe("metodo GET", () => {
    before(() => {
      sinon.stub(Team, "findAll").resolves(allTeamWithMatches as any);
    });

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it("Deve retornar status 200 e o placar de time dos jogos em casa", async () => {
      chaiHttpResponse = await chai.request(app).get("/leaderboard/home");

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.eql(homeBoard);
    });
    it("Deve retornar status 200 e o placar de time dos jogos fora de casa", async () => {
      chaiHttpResponse = await chai.request(app).get("/leaderboard/away");

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.eql(awayBoard);
    });
    it("Deve retornar status 200 e o placar geral dos times", async () => {
      chaiHttpResponse = await chai.request(app).get("/leaderboard");

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.eql(allBoard);
    });
  });
});
