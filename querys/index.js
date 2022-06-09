import { request, gql } from "graphql-request";

const url = "https://api-eu-central-1.graphcms.com/v2/cl38c2isz8v0i01xqdrwe7v1i/master";

const graphqlAPI = url;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            createdAt
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        exerpt
                        featuredimage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                author {
                    bio
                    name
                    id
                    createdAt
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                exerpt
                featuredimage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.post;
};

export const getRecentPosts = async () => {
    const query = gql`
  query GetPostDetails(){
    posts(
      orderBy : createdAt_ASC
      last: 3
      ){
        title
        featuredimage{
          url
        }
        createdAt
        slug
      }
  }
  `;
    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug
                    AND: { categories_some: { slug_in: $categories } }
                }
                last: 3
            ) {
                title
                featuredimage {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.categories;
};

//TODO: Check the spelling of the word 'excerpt' within the page.. its spelled woring all over
export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: { categories_some: { slug: $slug } }) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        exerpt
                        title
                        featuredimage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    //console.log(slug)
    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
    const query = gql`
  query GetCategoryPost(){
    posts(where: {featuredPost: true}){
      author{
        name
        photo{
          url
        }
      }
      featuredimage{
        url
      }
      title
      slug
      createdAt
    }
  }
  `;

    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const submitComment = async (obj) => {
    const result = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });

    return result.json();
};

export const getComments = async (slug) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.comments;
};