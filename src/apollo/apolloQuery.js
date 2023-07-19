import { gql } from '@apollo/client';

const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!) {
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
      repositories(first: 100) {
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
        }
      }
    }
  }
`;

export default GET_USER_REPOSITORIES;