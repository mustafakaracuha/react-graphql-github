import { gql } from "@apollo/client";

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!, $orderBy: OrderDirection!) {
    user(login: $username) {
      avatarUrl
      name
      url
      login
      location
      bio
      followers(first: 100) {
        totalCount
        nodes {
          login
          avatarUrl
          url
        }
      }
      following(first: 100) {
        totalCount
        nodes {
          login
          avatarUrl
          url
        }
      }
      repositories(first: 100, orderBy: { field: CREATED_AT, direction: $orderBy }) {
        totalCount
        nodes {
          name
          url
          stargazerCount
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
          createdAt
        }
      }
    }
  }
`;
