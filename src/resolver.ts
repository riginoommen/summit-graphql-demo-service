import { SummitGraphqlDemo } from './schema';
export const SummitGraphqlDemoResolver = {
  Query: {
    // queries
    list(root: any, args: any, ctx: any) {
      return [{message: 'GET API for SummitGraphqlDemo microservice'}];
    },
    get(root: any, args: any, ctx: any) {
      // fetch the id from args.id
      return {message: 'GET by ID API for SummitGraphqlDemo microservice'};
    }
  },
  Mutation: {
    // mutations
    create(root: any, args: any, ctx: any) {
      return {message: 'POST API for SummitGraphqlDemo microservice'};
    },
    update(root: any, args: any, ctx: any) {
      /* Optional: if you want to send graphql subscription updates when this query is called) */
      // pubsub.publish(SummitGraphqlDemo_UPDATE, data);
      return {message: 'PUT API for SummitGraphqlDemo microservice'};
    },
    delete(root: any, args: any, ctx: any) {
      return {message: 'DELETE API for SummitGraphqlDemo microservice'};
    },

  }
}
