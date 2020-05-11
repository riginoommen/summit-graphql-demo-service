export typeDef = `type Query {
  # Query Definitions
  list: [SummitGraphqlDemoType]
  get(id: String!): SummitGraphqlDemoType
}

type Mutation {
  # Mutation Definitions
  create(input: SummitGraphqlDemoInput): SummitGraphqlDemoType
  update(input: SummitGraphqlDemoInput): SummitGraphqlDemoType
  delete(id: String!): SummitGraphqlDemoType
}

type SummitGraphqlDemoType {
  message: String
}

input SummitGraphqlDemoInput {
  message: String
}`;
