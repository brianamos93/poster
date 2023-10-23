"use client"
import { useState } from "react"
import { useEffect } from "react"

import loginService from '../services/login'
import noteService from '../services/note'

export default function Posts() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')



	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON)
		  setUser(user)
		  noteService.setToken(user.token)
		}
	  }, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(user)
			)
			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
				type="text"
				value={username}
				name="Username"
				onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
				type="password"
				value={password}
				name="Password"
				onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const noteForm = () => (
		<form onSubmit={addNote}>
			<input
			value={newNote}
			onChange={handleNoteChange}
			/>
			<button type="submit">save</button>
		</form>
	)
	return (
		<div>
			
			{!user && loginForm()}
    		{user && <div>
      			<p>{user.name} logged in</p>
         			{noteForm()}
					</div>
			}
			
		</div>
	)

}