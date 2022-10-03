import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock = [
    {
      id: 1,
      teamName:"Avaí/Kindermann",
    },
    {
     
      id: 2,
     
      teamName:"Bahia"
    },
    {
     
      id: 3,
      teamName:"Botafogo"
    }
  ]

const oneTeam =   {
  id: 1,
  teamName:"Avaí/Kindermann",
}

describe('Deve testar os metodos na rota /teams', () => {
  let chaiHttpResponse: Response;
  describe('metodo GET', () => {

  beforeEach(() => {
    sinon.stub(Team, "findAll").resolves(teamMock as Team[]);
    sinon.stub(Team, "findByPk").resolves(oneTeam as Team);
  });

  after(()=> {
    (Team.findAll as sinon.SinonStub).restore(),
    (Team.findByPk as sinon.SinonStub).restore()

  })
  
  it('Deve retornar status 200 e todos os times em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
  
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(teamMock);
    });
  })

  it.only('Deve retornar status 200 e o time escolhido por id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1')
    
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(teamMock[0]);
  });
  
})
