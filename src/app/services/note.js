const baseUrl = 'http://localhost:3001/api/notes'

let token = null
const setToken = newToken => {  
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = fetch(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await fetch(baseUrl,{
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Authorization": token,
	},
  body: JSON.stringify(newObject)
  })
  return response.json()
}

const update = (id, newObject) => {
  const request = fetch(`${ baseUrl }/${id}`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  })
  return request.then(response => response.json())
}

export default { getAll, create, update, setToken }