import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FeaturedPostCard } from "../components";
import { getFeaturedPosts } from "../querys";

const responsive = {
    superlargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 768, min: 640 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

const FeaturedPosts = () => {
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getFeaturedPosts().then((result) => {
            setFeaturedPosts(result);
            setDataLoaded(true);
        });
    }, []);

    const customLeftArrow = (
        <div className="arrow-btn absolute left-0 cursor-pointer rounded-full py-3 text-center hover:bg-indigo-400 hover:bg-opacity-40">
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
            >
                <path
                    d="M9 15L9 17C9 17.961 7.77661 18.3688 7.2 17.6L3.45 12.6C3.18333 12.2444 3.18333 11.7556 3.45 11.4L7.2 6.4C7.77661 5.63119 9 6.03899 9 7L9 11C9 11.5523 9.44772 12 10 12L21 12"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    );

    const customRightArrow = (
        <div className="arrow-btn absolute right-0 cursor-pointer rounded-full py-3 text-center hover:bg-indigo-400 hover:bg-opacity-40">
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
            >
                <path
                    d="M15 15L15 17C15 17.961 16.2234 18.3688 16.8 17.6L20.55 12.6C20.8167 12.2444 20.8167 11.7556 20.55 11.4L16.8 6.4C16.2234 5.63119 15 6.03899 15 7L15 11C15 11.5523 14.5523 12 14 12L3 12"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    );

    return (
        <div className="mb-8">
            <Carousel
                infinite
                customLeftArrow={customLeftArrow}
                customRightArrow={customRightArrow}
                responsive={responsive}
                itemClass="px-4"
            >
                {dataLoaded &&
                    featuredPosts.map((post, index) => (
                        <FeaturedPostCard key={index} post={post} />
                    ))}
            </Carousel>
        </div>
    );
};

export default FeaturedPosts;

/* export async function getStaticProps() {
  const data = await getFeaturedPosts()

  return {
    props: { posts: data },
  }
} */
