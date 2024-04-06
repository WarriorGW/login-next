"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { validatePassword } from "@/utils/validatePass";
import Link from "next/link";

function LoginForm() {
	const router = useRouter();

	const [loginAttempts, setLoginAttempts] = useState(0);
	const [isBlocked, setIsBlocked] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		pass: "",
	});

	const [errors, setErrors] = useState({
		emailError: "",
		passError: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let emailError = "";
		let passError = "";

		if (!formData.email) {
			emailError = "Por favor ingresa el nombre.";
		}

		const passwordError = validatePassword(formData.pass);
		if (passwordError) {
			passError = passwordError;
		}

		setErrors({ emailError, passError });

		if (emailError || passError) {
			return;
		}

		try {
			const res = await axios.post("http://localhost:4000/user", formData);
			document.cookie = `username=${res.data.email}; path=/;`;
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

	useEffect(() => {
		if (isBlocked) {
			alert(
				"Has excedido el número de intentos permitidos. Por favor, inténtalo de nuevo más tarde."
			);
		}
	}, [isBlocked]);

	return (
		<form
			className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg"
			onSubmit={handleSubmit}
		>
			<div className="m-2 flex flex-col">
				<label htmlFor="name" className="text-white mb-3">
					Email
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
			<p className="text-white mt-2">
				¿Olvidaste tu contraseña?{" "}
				<Link href="/changePass" className="text-blue-500">
					Recupérala aquí
				</Link>
			</p>
		</form>
	);
}

export default LoginForm;
