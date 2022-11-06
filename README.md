
  

# tp1-engsoft2

Sistema para controle das atividades diárias de uma clínica médica, como:
- Cadastro de pacientes
- Cadastro de médicos
- Cadastro de recepcionistas
- Solicitação de exames (a clínica não faz os exame, somente os pedidos)
- Agendamento de consultas

## Integrantes do grupo

- Caio César Silva - 2019075681
- Victor Vieira de Melo - 2019055028
- Miguel Scatolin Teixeira - 2019103642
- Daniel Gomes Xavier - 2019086950

## Como rodar a aplicação

Os seguintes itens são pré-requisitos
1. NodeJS 14+
2. Docker

Antes de tudo, deve-se instalar as dependências do projeto. Portanto, navegue até a pasta raíz do projeto e execute o comando:
```bash
npm install
```
Agora, ainda na pasta raíz, caso você queira rodar a aplicação em si, deve-se:

1. Criar um arquivo na raíz chamado `.env`. Nesse arquivo, devemos inserir o seguinte conteúdo:

```
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=med_center
POSTGRES_USER=africa
POSTGRES_PASSWORD=village_people
POSTGRES_DB=med_center_db
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
```
2. Logo após criar o arquivo em questão, bastar rodarmos o comando abaixo e a API estará funcionando em _http://localhost:3000_

```bash
npm run start
```
O comando acima iniciará o Docker (que contém uma instância do banco de dados) e a própria aplicação em si.

## Exemplos Payload e Base de Testes

Há um arquivo na pasta base do projeto com o nome "tp2-engsoft.postman_collection.json"  que contém a collection para ser utilizada no Postman com vários exemplos de requisição, é o jeito mais recomendado para execução do projeto devido a facilidade, para utilizar, basta importar no [Postman](https://www.postman.com/)

Abaixo, estão alguns exemplos de requisições para o nosso sistema.

> Requisição para inserir um usuário

```bash
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
"role": "PATIENT",
"name": "Caio"
}'
```
> Requisição para consultar todos os pacientes
```bash
curl --location --request GET 'http://localhost:3000/patients'
```
> Requisição para deletar o paciente com id = 1
```bash
curl --location --request DELETE 'http://localhost:3000/patient/1'
```
> Requição para editar médico com id = 1
```bash
curl --location --request PUT 'http://localhost:3000/doctor/1' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "John Johnes"
}'
```