import Link from "next/link";

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
	return (
		<section>
			<h1>{type} Post</h1>
			<p>{type} and share ideas with friends.</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Post</span>
					<input 
					type="text" 
					name="title" 
					id="title"
					value={post.title}
					onChange={(e) => setPost({ ...post, title: e.target.value })}
					required
					 />
				</label>
				<div>
					<Link href="/">Cancel</Link>
					<button
					type='submit'
					disabled={submitting}>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Form