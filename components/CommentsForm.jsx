import React, { useState, useEffect, useRef } from "react";

import { submitComment } from "../querys";

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem("name");
        emailEl.current.value = window.localStorage.getItem("email");
    }, []);

    const handleCommentSubmisson = () => {
        setError(false);

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = {
            name,
            email,
            comment,
            slug,
        };

        if (storeData) {
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("email", email);
        } else {
            window.localStorage.removeItem("name", name);
            window.localStorage.removeItem("email", email);
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className="rounded-ls mb-8 bg-white p-8 pb-12 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
                Leave a comment on this article
            </h3>
            <div className="mb-4 grid grid-cols-1 gap-4">
                <textarea
                    ref={commentEl}
                    className="w-full rounded-lg bg-gray-200 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <input
                    type="text"
                    ref={nameEl}
                    className="w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Name"
                    name="name"
                />
                <input
                    type="text"
                    ref={emailEl}
                    className="w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4">
                <div>
                    <input
                        ref={storeDataEl}
                        type="checkbox"
                        id="storeData"
                        name="storeData"
                        value={true}
                    />
                    <label
                        className="ml-2 cursor-pointer text-gray-500"
                        htmlFor="storeData"
                    >
                        Save my email and name for the next time I comment.
                    </label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">All fields are required.</p>}
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleCommentSubmisson}
                    className="hover inline-block transform cursor-pointer rounded-full bg-green-500 px-5 py-2 text-lg font-medium text-white transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-700 active:-translate-y-0.5 active:shadow-lg active:shadow-black"
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className="float-right mt-3 text-xl font-semibold text-gray-500">
                        Comment submitted for review.
                    </span>
                )}
            </div>
        </div>
    );
};

export default CommentsForm;
