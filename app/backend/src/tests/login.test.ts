import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
import bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  // password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  password: "secret_admin",
}

describe('Usando o metodo POST na rota /login', () => {
  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(User, "findOne")
  //     .resolves({
      
  //     } as User);
  // });

  // after(()=>{
  //   (User.findOne as sinon.SinonStub).restore();
  // })

  it('Retorna um token e status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userMock);

    // const result = bcrypt.compareSync("senha",userMock.password);
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body.login).to.deep.eq(userMock);
  });
});
