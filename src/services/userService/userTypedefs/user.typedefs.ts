import { gql } from "graphql-tag";

export const userTypeDef = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    username: String!
  }

  type Metadata {
    page: Int
    limit: Int
    total: Int
    totalPages: Int
  }

  type UserResponse {
    success: Boolean!
    statusCode: Int!
    message: String!
    data: [User]
    errors: [String]
    meta: Metadata
  }

  type Query {
    users: UserResponse
  }
`;
