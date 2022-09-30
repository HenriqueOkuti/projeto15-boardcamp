import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const server = express();
server.use(cors);

//Test

//================================
// CRUD de Categorias [Create | Read]:

// ROTA GET: /categories
// RESPONSE: lista de todas as categorias (array de objetos)

// ROTA POST: /categories
// RESPONSE: 201 (created) || 400 (empty name) || 409 (name already exists)

//================================
// CRUD de Jogos [Create | Read]:

// ROTA GET: /games
// RESPONSE: lista dos jogos encontrados (array de objetos , não esquecer categoria dos jogos)
// PARAMS: 'name' na query string da requisição, filtrar jogos, retornar os que começam com a string passada (case insensitive)

// ROTA POST: /games
// RESPONSE: 201 (created) || 400 (invalid parameters) || 409 (game already exists)

//================================
// CRUD de Clientes [Create | Read | Update]:

// ROTA GET: /customers
// RESPONSE: lista com todos os clientes (array de objetos)
// PARAMS: 'cpf' query string, retornar apenas dados que começam com o cpf (ex: cpf=012 -> retornar dados que começam com 012 no cpf)

// ROTA GET: /customers/:id
// RESPONSE: retornar objeto cliente se id existir || 404 (does not exist)

// ROTA POST: /customers
// RESPONSE: 201 (created) || 400 (invalid parameters) || 409 (client already exists)

// ROTA PUT: /customers/:id
// RESPONSE: 200 (updated) || 400 (invalid parameters) || 409 (cpf already in use)

//================================
// CRUD de Aluguéis [Create | Read | Update | Delete]:

// ROTA GET: /rentals
// RESPONSE: lista com todos os aluguéis, contendo o customer e o game do aluguel em questão em cada aluguel (array de objetos)
// PARAMS: customerId -> Retornar apenas referente ao customer
// PARAMS: gameId -> Retornar apenas referente ao jogo

// ROTA POST: /rentals
// RESPONSE: 201 (created) || 400 (multiple possible errors)
// ERRORS: customerId must exist, gameId must exist, daysRented>0, etc

// ROTA POST: /rentals/:id/return
// RESPONSE: 200 (ok) || Multiple possible errors
// Multiple requirements

// ROTA DELETE: /rentals/:id
// RESPONSE : 200 (ok) || 404 (id does not exist) || 400 (non-finalized rental)

//================================
// Bônus:

// PAGINAÇÃO
// ROTA GET: /categories ; /games ; /customers ; /rentals
// Query string: limit (how many to send) && offset (start sending at here +1)

// ORDENAÇÃO
// ROTA GET: /categories ; /games ; /customers ; /rentals
// Query string: order=name (filter by name) && desc=true (alphabetical if false as default, inverted if true)

// FILTRAGEM POR DATA
// ROTA GET: /rentals
// Query string: status=open (filter by non finalized rentals) && status=closed (filter by finalized rentals)
// Query string: startDate (filter starting by this date);

// FATURAMENTO
// ROTA GET: /rentals/metrics
// RESPONSE: objeto (revenue , rentals , average)
// revenue: o total de receita da loja
// rentals: a quantidade total de aluguéis
// average: a média de receita por aluguel
// Query string: startDate (filter starting here) && endDate (filter ends here)

// QUANTIDADE DE ALUGUÉIS
// ROTA GET /games, /customers
// Sem aumentar o número de queries feitas no banco, adicione nos retornos das rotas acima,
// em uma propriedade rentalsCount, a quantidade de aluguéis já feitos para aquele cliente ou daquele jogo.
// Ex: se um jogo já foi alugado 10 vezes, em cada jogo deve ser incluído um campo rentalsCount: 10

//================================

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
