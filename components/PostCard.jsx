import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({ post }) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
      <div className="relativ mb-6 overflow-hidden pb-4 shadow-md">
        {
          <img
            src={post.featuredimage.url}
            alt={post.title}
            className="h-80 w-full rounded-t-lg object-cover object-top shadow-lg lg:rounded-lg"
          />
        }
      </div>
      <h1 className="mb-8 cursor-pointer text-center text-3xl font-semibold transition duration-500 hover:text-green-500">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
        <div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
          <img
            alt={post.author.name}
            height="50px"
            width="50px"
            className="rounded-full align-middle"
            src={post.author.photo.url}
          />
          <p className="ml-2 inline align-middle text-lg text-gray-700">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 inline h-6 w-6 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format('MMM DD YYYY')}</span>
        </div>
      </div>
      <p className="mb-6 px-4 text-center text-lg font-normal text-gray-700 lg:px-20">
        {post.exerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="hover inline-block transform cursor-pointer rounded-full bg-green-500 px-5 py-2 text-lg font-medium text-white transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-700 active:-translate-y-0.5 active:shadow-lg active:shadow-black">
            Contine Reading
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
