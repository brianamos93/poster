import { useState } from " react"
import { useRouter } from "next/router"
import Form from "@/app/components/Form"

export default function Newpost() {
	const router = useRouter()
	const [submitting, setSubmitting] = useState(false)
	const [post, usePost] = useState({ title: "" })

	const createPost = async (e) => {
		e.preventDefault()
		setSubmitting(true)

		try {
			const res = await fetch("http://localhost:3005/posts/new", {
				method: "POST",
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