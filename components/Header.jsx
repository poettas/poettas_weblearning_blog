import React, { useState, useEffect, useContext } from "react";
import { getCategories } from "../querys";

import Link from "next/link";

const Header = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories));
    }, []);

    return (
        <div className="container mx-auto mb-8 px-10">
            <div className="inline-block w-full border-b border-blue-400 py-8">
                <div className="block md:float-left">
                    <Link href="/">
                        <>
                            <span className="cursor-pointer text-4xl font-extrabold">
                                Beginner Web Dev Stories
                            </span>
                            <br />
                            <span className="cursor-pointer text-xl font-bold">
                                Short stories about tech based and other things
                            </span>
                        </>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
