const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    // Value from the client
    return new Date(value);
  },
  serialize(value) {
    // Value sent to the client
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Value from the client query variable
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

module.exports = DateScalar;
