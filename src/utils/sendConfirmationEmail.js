import axios from "axios";
import tokenGenerator from "./tokenGenerator";
import { setCookie } from "./cookies";

const sendConfirmationEmail = async (email) => {
	try {
		const token = tokenGenerator();
		const confirmationLink = `http://localhost:5173/confirmation/${token}`;
		setCookie("token", token, 1);
		const response = await axios.post("http://localhost:4000/sendMail", {
			email: email,
			text: confirmationLink,
		});
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default sendConfirmationEmail;
