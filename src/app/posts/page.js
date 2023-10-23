"use client"
import { useState, useEffect } from "react"

import loginService from '../services/login'
import noteService from '../services/note'

export default function Posts() {
	const [newNote, setNewNote] = useState('')
	const [notes, setNotes] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		noteService
		  .getAll()
		  .then(initialNotes => {
			setNotes(initialNotes)
		  })
	  }, [])
	
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

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	  }

	
	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
		  content: newNote,
		  important: Math.random() > 0.5,
		}
	  
		noteService
		  .create(noteObject)
			.then(returnedNote => {
			setNotes(notes.concat(returnedNote))
			setNewNote('')
		  })
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