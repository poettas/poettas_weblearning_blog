// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from "console";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI =
    "https://api-eu-central-1.graphcms.com/v2/cl38c2isz8v0i01xqdrwe7v1i/master";

const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTQwNzAxNjAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NsMzhjMmlzejh2MGkwMXhxZHJ3ZTd2MWkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNmQ1ZWQ1NzktNzViZS00Y2Q2LWE4MjQtN2Q4NTdmMGNlODgwIiwianRpIjoiY2wzdmFvMGMwZXo2MTAxejE5Mjh5NmRtMyJ9.wuxzfV4Lyf4LxcLJwEpvdK3t4EkeXgNbYKjNP69KnVHq5q5LcTeIcp5FOOTxleicNQZGd053KB5ivpuX0s6wdxu60htyoaS9NkEAS3B86TSSwPwN7l6KDWbu7s9kvhDXji6dDuko1lBY60sQ0uLLpysKZP_x1P8243EyKRg29vjhjPr74KR-Cfgh1gaTLn2ywmEcAIDk12zgSaQjnn-E-KA2EbuDpNo4ClD3iy5bfegLeUurlu1pnNkAa5W5_mheh0A0gDWlF5p8eurG28FlbTuf-NHgYfRtNH_0f3NEO1Xk0Th_5_fu5-29Ip8pg4O2Cf05hNl3KF-uz4D0UlzRjs2ZqQHpg2OTbLWUniScorXILyqNuJMnhc0JGgGM8k0f59_15g_AWZbqAM6iugLjhDaJAK1qbc8r5-k1KDilHJ_geYGjUnsrVsk49ZscF10l5853bPn23NdwoC5agT5egIeNlM4JOTrwIxAcMTBAXe-IVHoRY05quzhW7aX6qWkjZ1d5hq-FJ_l2lWMTWT76U5y5JumRyLQlVBxWqku7xf8sKEubIze5NYp5n4izw-AkPYS81rn5WH2cG6Dgh76BGxFXyRk2o_9RPtK8VgQP-IfxtX2CHvlmH0vPaX4503sDjNndhfqdn8uPMWtyP-FmtBDoEl6YKe6p0qE6bG_cPZ0";

console.log(graphqlAPI);

export default async function comments(req, res) {
    console.log(graphqlAPI);
    const graphQLCLient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${token}`,
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
