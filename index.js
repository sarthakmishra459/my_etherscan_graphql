const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

// Resolvers map for Query fields to data source methods
const resolvers = {
  Query: {
    getEthByAddress: (root, _args, { dataSources }) => // Calls etherBalanceByAddress() method on data source
      dataSources.ethDataSource.etherBalanceByAddress(),
    getTotalSupplyEth: (root, _args, { dataSources }) => // Calls totalSupplyOfEther() method on data source
      dataSources.ethDataSource.totalSupplyOfEther(),
    //Paste Code for New Resolver Functions
    getEthPrice: (root, _args, { dataSources }) => // Calls getLatestEthereumPrice() method on data source
      dataSources.ethDataSource.getLatestEthereumPrice(),
    getEstimationTimePerTransaction: (root, _args, { dataSources }) => // Calls getBlockConfirmationTime() method on data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
