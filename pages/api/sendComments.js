// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from "console";
import { GraphQLClient, gql } from "graphql-request";

//TODO: look "absolute url"
// error during the building process
// url of the cms => does the hardcode way work?
const graphqlAPI =
    "https://api-eu-central-1.graphcms.com/v2/cl38c2isz8v0i01xqdrwe7v1i/master";

console.log(graphqlAPI);

export default async function comments(req, res) {
    console.log(graphqlAPI);
    const graphQLCLient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
        },
    });

    //mutation of the cms => you still have to review the posts in the cms
    const query = gql`
        mutation CreateComment(
            $name: String!
            $email: String!
            $comment: String!
            $slug: String!
        ) {
            createComment(
                data: {
                    name: $name
                    email: $email
                    comment: $comment
                    post: { connect: { slug: $slug } }
                }
            ) {
                id
            }
        }
    `;

    //only req.body, because the body already contains all the data we want to get
    try {
        const result = await graphQLCLient.request(query, req.body);

        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
