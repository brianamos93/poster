import styles from './page.module.css'
import Post from '@/app/components/Post'

async function getPosts() {
  const res = await fetch('http://localhost:3005/posts/')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {

  const posts = await getPosts()

  return (
    <main className={styles.main}>
      <ul>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </ul>
    </main>
  )
}
