# Microserviço de autenticação com Nodejs

Neste projeto criamos um **microserviço de autenticação** que pode compor a sua caixinha de ferramentas e ser muito útil no dia a dia.

## Composição do nosso projeto

Neste projeto temos alguns **Endpoints Base** que podem ser extendidos da forma mais adequada para o contexto. 

São eles:

### Usuários

* GET /users
* GET /users/:uuid
* POST /users
* PUT /users/:uuid
* DELETE /users/:uuid

### Autenticação

* POST /token
* POST /token/validate