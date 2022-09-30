import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// import bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
// import tokenGenerate from '../helper/tokenGenerate';

chai.use(chaiHttp);

const { expect } = chai;


const fakeUserMock = {
  username: "klaus",
  role: "tryber",
  email: "admin@fake.com",
  password: "secret_fake",
}

const userMock = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}


describe('Deve testar os metodos na rota /login', () => {
  let chaiHttpResponse: Response;
  describe('metodo POST', () => {

  beforeEach(() => {
    sinon.stub(User, "findOne").resolves(userMock as User);
  });

  after(()=> {
    (User.findOne as sinon.SinonStub).restore()

  })
  
  it('Deve retornar status 200 e um Token em caso de sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email:'admin@admin.com', password:'secret_admin'});
  
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.have.property("token");
    });
  })

  it('Caso não enviado email, deve retornar status 400 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({password:'secret_admin'});
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eql('All fields must be filled')
  })

  it('Caso não enviado senha, deve retornar status 400 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email:userMock.email});
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eql('All fields must be filled')
  })

  it('Caso enviado email invalido, deve retornar status 401 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email:fakeUserMock.email, password:'secret_admin'});
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eql('Incorrect email or password')
  })

  it('Caso enviado senha invalida, deve retornar status 401 e messagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email:userMock.email,password:fakeUserMock.password});
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eql('Incorrect email or password')
  })
})
