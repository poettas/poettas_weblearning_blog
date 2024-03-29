import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../querys";

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
        } else {
            getRecentPosts(categories, slug).then((result) => setRelatedPosts(result));
        }
    }, [slug]);

    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-8 border-b-2 pb-4 text-xl font-semibold">
                {slug ? "Related Posts" : "Recent Posts"}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="mb-4 flex w-full items-center">
                    <div className="h-14 flex-none">
                        <img
                            alt={post.title}
                            height="70px"
                            width="70px"
                            className="rounded-full align-middle"
                            src={post.featuredimage.url}
                        />
                    </div>
                    <div className="ml-4 flex-grow">
                        <p className="font-xs text-gray-500">
                            {moment(post.createdAt).format("MMM DD, YYYY")}
                        </p>
                        <Link
                            href={`/post/${post.slug}`}
                            key={post.title}
                            className="text-md transition duration-500 hover:text-green-500"
                        >
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
