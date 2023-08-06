"use client"

import { useRouter } from "next/navigation"



const Post = ({ key, post }) => {

	const router = useRouter()
	
	const deletePost = async (key) => {

		const res = await fetch(`/posts/${key.toString()}`, {
			method: 'DELETE'
		})
		const data = res.json()
		console.log(data)

	}

	const editPost = (key) => {


		router.push(`http://localhost:3001/api/posts/edit?id=${key}`)
	}

	return (


		<>
		<li key={key}>
            {post.title}
            <button onClick={() => deletePost(post.id)}>Delete</button>
			<button onClick={() => editPost(post.id)}>Edit</button>
          </li>
		</>
	)
}

export default Post