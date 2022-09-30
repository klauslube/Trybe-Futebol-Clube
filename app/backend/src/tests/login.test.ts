import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// import bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import tokenGenerate from '../helper/tokenGenerate';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "secret_admin",
}

const fakeUserMock = {
  username: "klaus",
  role: "tryber",
  email: "admin@fake.com",
  password: "secret_fake",
}


describe('Deve testar os metodos na rota /login', () => {
  let chaiHttpResponse: Response;
  describe('metodo POST', () => {

  before(() => {
    sinon.stub(User, "findOne").resolves({...userMock} as User);
  });

  after(()=> {
   sinon.restore();
  })
  
  it('Deve retornar status 200 e um Token em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userMock);

    expect(chaiHttpResponse.status).to.be.eq(200);
    // expect(chaiHttpResponse.body).to.property("token");
    });
  })

  it('Caso não enviado email, deve retornar status 400 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userMock.password);
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.be.eq({message:'Incorrect email or password'})
  })

  it('Caso não enviado senha, deve retornar status 400 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userMock.email);
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.be.eq({message:'Incorrect email or password'})
  })

  it('Caso enviado email invalido, deve retornar status 401 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(fakeUserMock.email);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eq({message:'Incorrect email or password'})
  })

  it('Caso enviado senha invalida, deve retornar status 401 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(fakeUserMock.password);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.have.eq({message:'Incorrect email or password'})
  })
})
