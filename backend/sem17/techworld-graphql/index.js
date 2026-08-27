const { ApolloServer, gql } = require('apollo-server');

// 1. Dados fictícios (Mock Data)
const clientes = [
    { id: "1", nome: "Ana Silva", email: "ana@techworld.com" },
    { id: "2", nome: "Bruno Costa", email: "bruno@techworld.com" }
];

const produtos = [
    { id: "101", nome: "Teclado Mecânico", preco: 250.00, estoque: 3 },
    { id: "102", nome: "Mouse Gamer", preco: 150.00, estoque: 12 },
    { id: "103", nome: "Monitor 24'", preco: 890.00, estoque: 4 }
];

// 2. Definição do Schema (Tipos e Consultas)
const typeDefs = gql`
    type Cliente {
        id: ID!
        nome: String!
        email: String!
    }

    type Produto {
        id: ID!
        nome: String!
        preco: Float!
        estoque: Int!
    }

    type Query {
        cliente(id: ID!): Cliente
        produtos(estoqueMin: Int): [Produto!]!
    }
`;

// 3. Resolvers (Regras de busca dos dados)
const resolvers = {
    Query: {
        cliente: (_, { id }) => clientes.find(c => c.id === id),
        produtos: (_, { estoqueMin }) => {
            if (estoqueMin !== undefined) {
                return produtos.filter(p => p.estoque <= estoqueMin);
            }
            return produtos;
        }
    }
};

// 4. Inicialização do Servidor
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Servidor GraphQL pronto em ${url}`);
});
