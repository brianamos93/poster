'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Form from "@/app/components/Form"

export default function Newpost() {
	const router = useRouter()
	const [submitting, setSubmitting] = useState(false)
	const [post, setPost] = useState({ title: "" })

	const createPost = async (e) => {
		e.preventDefault()
		setSubmitting(true)

		try {
			const res = await fetch("http://localhost:3005/posts/", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					title: post.title,
				}),
			})

			if (res.ok) {
				router.push("/")
			}
		} catch (error) {
			console.log(error)
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPost}
		/>
	)
}