const MAIN_URL = "http://localhost:5000/"

export const connection_test = async() =>{
    let backend_test = await fetch(`${MAIN_URL}`)
    let response = backend_test.json()
    console.log(response)
    return response
}