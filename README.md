# Clinic API

Esta api foi criada a partir do deafio [Clinic Dev Backend Interview](https://git.cubos.io/cubos/desafios-tecnicos/desafio-tecnico-backend).

### Estrutura GIT

Foi decidido não utilizar a estrutura de criação de PRs com branches baseadas em tasks por conta do pouco tempo para desenvolver, isso não foi um problema dado que o projeto foi desenvolvido apenas por mim.

### Estrutura Endpoints

A API utiliza uma estrutura de endpoints que utiliza a metodologia Restfull.

## Informações úteis

### Download do projeto
Após baixar o projeto é preciso instalar os pacotes do projeto com o `NPM`. A execução será feita utilizando `NODE`.
Dentro do pacote do projeto, instale os pacote com o comando:
```
npm i
```

### Banco de Dados (BD)
Foi exigido que fosse utilizado um arquivo json como banco de dados. Esse arquivo é criado  quando a aplicação é iniciada pela primeira vez, e não deve ser alterado manualmente. Caso seja alterado, basta excluir o arquivo `./src/database/data/database.json` e reniciar a aplicação 

### Postman Collection
Dentro do projeto está exportada a coleção `./postmanCollection/Clinic API.postman_collection.json` que foi utilizada para testar e validar os endpoints e exemplificam como utilizar a API.

### start
Executa a API da forma tradicional.
```
npm run start
```

### dev
Utiliza o `nodemon` para manter a API sempre rodando e atualizando em caso de alterações ou eventuais erros.
```
npm run dev
```
## O que ainda não foi implementado (baseado no desafio)
- Testes unitários;