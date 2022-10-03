import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './source/routers/router.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());
server.use(router);

//================================
// CRUD de Clientes [Create | Read | Update]:

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

const PORT = process.env.PORT; //|| 4001;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));