import { GraphQLClient, gql } from 'graphql-request';
import type { Character } from './types';

const client = new GraphQLClient('https://rickandmortyapi.com/graphql');

const CHARACTERS_QUERY = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

interface CharactersResponse {
    characters: {
        results: Character[];
    };
}

export async function fetchCharacters(): Promise<Character[]> {
    const data = await client.request<CharactersResponse>(CHARACTERS_QUERY);
    return data.characters.results;
}
