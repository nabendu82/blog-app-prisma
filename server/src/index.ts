import { ApolloServer } from "apollo-server";
import { Query } from "./resolvers/Query";
import { typeDefs } from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { Mutation } from "./resolvers/Mutation";
import { getUser } from "./utils/getUser";
const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
    userInfo: { userId: number } | null;
}

const server = new ApolloServer({
    typeDefs, 
    resolvers: {
        Query, Mutation
    },
    context: async ({ req }: any): Promise<Context> => {
        const userInfo = await getUser(req.headers.authorization);    
        return { prisma, userInfo };
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready on ${url}`);
});
