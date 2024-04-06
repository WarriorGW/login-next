import axios from "axios";
import tokenGenerator from "./tokenGenerator";
import { setCookie } from "./cookies";

const sendChangeEmail = async (email) => {
	try {
		const token = tokenGenerator();
		const changeLink = `http://localhost:5173/changePass/${token}`;
		setCookie("token", token, 1);
		const response = await axios.post("http://localhost:4000/sendMail", {
			email: email,
			text: changeLink,
		});
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default sendChangeEmail;
