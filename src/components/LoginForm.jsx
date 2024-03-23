"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function LoginForm() {
	const router = useRouter();

	const [loginAttempts, setLoginAttempts] = useState(0);
	const [isBlocked, setIsBlocked] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		pass: "",
	});

	const [errors, setErrors] = useState({
		nameError: "",
		passError: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const validatePassword = (password) => {
		const uppercaseRegex = /[A-Z]/;
		const lowercaseRegex = /[a-z]/;
		const numberRegex = /[0-9]/;
		const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
		const minLength = 6;

		let error = "";

		if (!password) {
			error += "Por favor ingresa la contraseña.\n";
			return error;
		}

		if (
			!uppercaseRegex.test(password) ||
			!lowercaseRegex.test(password) ||
			!numberRegex.test(password) ||
			!specialCharRegex.test(password) ||
			password.length < minLength
		) {
			error = "La contraseña debe contener al menos: ";
		}

		if (!uppercaseRegex.test(password)) {
			error += "Una letra mayúscula.";
		}
		if (!lowercaseRegex.test(password)) {
			error += "Una letra minúscula.";
		}
		if (!numberRegex.test(password)) {
			error += "Un número.";
		}
		if (!specialCharRegex.test(password)) {
			error += "Un carácter especial.";
		}
		if (password.length < minLength) {
			error += "Una longitud mínima de 6 caracteres.";
		}

		return error;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let nameError = "";
		let passError = "";

		if (!formData.name) {
			nameError = "Por favor ingresa el nombre.";
		}

		const passwordError = validatePassword(formData.pass);
		if (passwordError) {
			passError = passwordError;
		}

		setErrors({ nameError, passError });

		if (nameError || passError) {
			return;
		}

		try {
			const res = await axios.post("http://localhost:4000/user", formData);
			document.cookie = `username=${res.data.name}; path=/;`;
			router.push("/");
		} catch (error) {
			if (loginAttempts < 2) {
				setLoginAttempts(loginAttempts + 1);
			} else {
				setIsBlocked(true);
				setTimeout(() => {
					setIsBlocked(false);
					setLoginAttempts(0);
				}, 60000); // Bloquear por 1 minuto
			}
			alert("Usuario o contraseña incorrectos");
			console.log(error);
		}
	};

	return (
		<form
			className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg"
			onSubmit={handleSubmit}
		>
			<div className="m-2 flex flex-col">
				<label htmlFor="name" className="text-white mb-3">
					Nombre
				</label>
				<input
					type="text"
					name="name"
					id="name"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
				/>
				{errors.nameError && <p className="text-red-400">{errors.nameError}</p>}
			</div>
			<div className="m-2 flex flex-col">
				<label htmlFor="pass" className="text-white mb-3">
					Contraseña
				</label>
				<input
					type="password"
					name="pass"
					id="pass"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
				/>
				{errors.passError && <p className="text-red-400">{errors.passError}</p>}
			</div>
			<button
				type="submit"
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded ${
					isBlocked ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isBlocked}
			>
				Enviar
			</button>
		</form>
	);
}

export default LoginForm;
