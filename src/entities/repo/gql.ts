import { graphql } from "@/shared/api/gql-generated";

export const GET_REPOSITORIES = graphql(`
  query SearchRepositories($query: String!) {
    search(first: 20, query: $query, type: REPOSITORY) {
      nodes {
        ... on Repository {
          id
          url
          name
          description
          owner {
            id
            login
          }
          languages(first: 1) {
            nodes {
              name
            }
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`);

export const GET_REPOSITORY = graphql(`
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      url
      name
      description
      owner {
        id
        login
      }
      languages(first: 1) {
        nodes {
          name
        }
      }
      stargazers {
        totalCount
      }
    }
  }
`);
