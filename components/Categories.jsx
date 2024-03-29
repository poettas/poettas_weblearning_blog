import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../querys";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((newCategories) => setCategories(newCategories));
    }, []);

    return (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
            <h3 className="mb-8 border-b-2 pb-4 text-xl font-semibold">My Topics</h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`category/${category.slug}`}>
                    <span className="mb-3 block cursor-pointer pb-3">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
