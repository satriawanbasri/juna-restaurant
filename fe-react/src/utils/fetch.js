import axios from 'axios'

const fetch = async (token, baseURL, url, data) => {
    const options = { baseURL, url }
    if (token) options.headers = { Authorization: 'Bearer ' + token }
    if (data) {
        options.method = 'post'
        options.data = data
    }
    try {
        const response = await axios(options)
        return response.data
    } catch (error) {
        console.log(error)
        return {
            isSuccess: false,
            status: 'ERROR',
            message: 'Fetch failed!',
        }
    }
}

export default fetch
