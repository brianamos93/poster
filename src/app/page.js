import Image from 'next/image'
import styles from './page.module.css'

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
        {posts.map((posts) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
