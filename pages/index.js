import Head from "next/head";
import { PostCard, Categories, PostWidget, FeaturedPosts } from "../components";
import { getPosts } from "../querys";

export default function Home({ posts }) {
    console.log({ posts });
    return (
        <div className="container mx-auto mb-8 px-10">
            <Head>
                <title>Personal Techy Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FeaturedPosts />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post) => (
                        <PostCard post={post.node} key={post.node.title} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const posts = (await getPosts()) || [];
    console.log(posts);
    return {
        props: { posts },
    };
}
