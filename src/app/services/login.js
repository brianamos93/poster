const login = async credentials => {
  const response = await fetch('http://localhost:3001/api/login/', {
  method: "POST",  
  headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password
    })
  })
  return response.json()
}

export default { login }