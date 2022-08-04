import { GraphQLClient } from 'graphql-request';
const URL = 'https://beta.pokeapi.co/graphql/v1beta';
// const URL = 'https://beta.pokeapi.co/graphql/v1beta';
const client = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta');
export default client;
