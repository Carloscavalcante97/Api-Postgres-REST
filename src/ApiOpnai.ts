import axios from "axios";

const apiOpenai = axios.create({
	baseURL: 'https://api.openai.com/v1/chat/completions',
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${process.env.TOKEN_OPENAI}`
	}
})

export default apiOpenai    