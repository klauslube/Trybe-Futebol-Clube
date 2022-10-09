# Bem vindo ao Trybe Futebol Clube!
Esse projeto é uma API RESTfull na qual utiliza arquitetura MSC(model, Service, Controller) para ler,filtrar e criar partidas de futebol,times e tabelas de ranking. Desenvolvido na [Trybe](https://www.betrybe.com/) com uso de TypeScript, Node Js, Sequelize, Express e outras stacks.


# Sumário
- [Bem vindo ao Blogs API project!](#bem-vindo-ao-trybe-futebol-clube!)
- [Sumário](#sumário)
- [Contexto](#contexto)
- [Tecnologias, bibliotecas e arquiteturas usadas](#tecnologias-bibliotecas-e-arquiteturas-usadas)
- [Instruções da aplicação](#instruções-da-aplicação)


# Contexto
Esse Projeto é um site informativo sobre partidas e classificações dos times de futebol.Para essa aplicação foi criado uma RESTfull API que se conecta ao banco de dados MySQL via Sequelize, ao qual faz as ações de ler, modificar, filtrar e criar partidas, usuarios e times de futebol.

# Tecnologias, bibliotecas e arquiteturas usadas
  * __TypeScript__ | [Tipagem de variáveis](https://www.typescriptlang.org/docs/).
  * __Node.js, Express, Nodemon__ | [Criação de protocolo HTTP API](http://expressjs.com/), [Roteador de API](https://expressjs.com/en/guide/routing.html), [improve API development](https://www.npmjs.com/package/nodemon).
  * __Sequelize__ | [Mapeamento de objetos](https://sequelize.org/).
  * __Jwt__ | [Autenticação e criação de tokens](https://jwt.io/).
  * __bcrypt__ | [Encriptador de senhas](https://www.npmjs.com/package/bcrypt).
  * __MySQL__ | [Criação e gerenciamento de dados](https://www.mysqltutorial.org/).
  * __MSC__ | [Arquiterura model, service, controller](https://martinfowler.com/architecture/).
  * __REST__ | [Arquitetura Rest](https://restfulapi.net/).
  * __POO__ | [Programação orientada a objetos](https://www.alura.com.br/artigos/poo-programacao-orientada-a-objetos).
  * __SOLID__ | [Principios de design SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)
  * __mocha, chai, Sinon__ | [Criação de testes](https://mochajs.org/)(https://sinonjs.org/)

# Instruções da aplicação
### Instalar dependências
```
cd Trybe-Futebol-Clube
npm install
```
### Rodar aplicação sem Docker

Crie um arquivo `.env` com sua conexão ao MySQL.


```
cd Trybe-Futebol-Clube
npm run debug
```

### Rodando aplicação com Docker (arquivo docker-compose foi criado pela Trybe)
```
cd app
docker-compose up -d
```

### Rodando aplicação back-end com Docker (arquivo docker-compose foi criado pela Trybe)
```
cd backend
npm run dev
```
### Rodando aplicação front-end com Docker (arquivo docker-compose foi criado pela Trybe)
```
obs: front-end desenvolvido pela trybe

cd frontend
npm start
```

### Rodar Lint
```
npm run lint
```

### Rodar tests
```
cd backend
npm run test
```

### Dando login de usuario 
```
exemplo: 
email: admin@admin.com , senha: secret_admin


