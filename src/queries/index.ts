import { gql } from "@apollo/client";

export const FEED_QUERY = gql`
  query {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      createdAt
      url
      description
    }
  }
`;
