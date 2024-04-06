"use client";
import { useState } from "react";
import sendChangeEmail from "@/utils/sendChangeEmail";
import { useRouter } from "next/navigation";

function SendMailPass() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
	});

	const [errors, setErrors] = useState({
		emailError: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const emailError = !formData.email ? "Por favor ingresa el email" : "";
		setErrors({ emailError });
		if (emailError) {
			return;
		}
		const response = await sendChangeEmail(formData.email);
		console.log(response);
		alert(
			"Se ha enviado un correo con el link de recuperacion, revisa tu bandeja de entrada"
		);
		router.push("/login");
	};

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	return (
		<form
			className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg"
			onSubmit={handleSubmit}
		>
			<div className="m-2 flex flex-col">
				<label htmlFor="email" className="text-white mb-3">
					Ingresa tu Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
				/>
				{errors.emailError && (
					<p className="text-red-400">{errors.emailError}</p>
				)}
			</div>
			<button
				type="submit"
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded`}
			>
				Enviar codigo de recuperacion
			</button>
		</form>
	);
}

export default SendMailPass;
