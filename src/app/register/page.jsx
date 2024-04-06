"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { validatePassword, validatePhone } from "@/utils/validatePass";
import { country } from "@/utils/country";
import sendConfirmationEmail from "@/utils/sendConfirmationEmail";

function Register() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: "",
		pass: "",
		phone: "",
		country: "Mexico",
	});

	const [errors, setErrors] = useState({
		emailError: "",
		confirmEmailError: "",
		passError: "",
		phoneError: "",
		countryError: "",
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
		let confirmEmailError = "";
		let passError = "";
		let phoneError = "";
		let countryError = "";

		if (!formData.email) {
			emailError = "Por favor ingresa el email.";
		}

		if (formData.email !== formData.confirmEmail) {
			confirmEmailError = "Los correos electrónicos no coinciden.";
		}

		const passwordError = validatePassword(formData.pass);
		if (passwordError) {
			passError = passwordError;
		}

		const phonedError = validatePhone(formData.phone);
		if (phonedError) {
			phoneError = phonedError;
		}

		if (!formData.country) {
			countryError = "Por favor ingresa el pais.";
		}

		setErrors({
			emailError,
			confirmEmailError,
			passError,
			phoneError,
			countryError,
		});

		if (emailError || passError || phoneError || countryError) {
			return;
		}

		const { confirmEmail, ...formDataWithoutConfirmEmail } = formData;

		console.log(formDataWithoutConfirmEmail);

		try {
			const res = await axios.post(
				"http://localhost:4000/users",
				formDataWithoutConfirmEmail
			);
			const response = await sendConfirmationEmail(formData.email);
			console.log("BD");
			console.log(res);
			console.log("Validacion de correo");
			console.log(response);
			router.push("/login");
		} catch (error) {
			alert("Error al registrar el usuario");
			console.log(error);
		}
	};

	return (
		<form
			className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg w-96"
			onSubmit={handleSubmit}
		>
			<div className="m-2 flex flex-col">
				<label htmlFor="email" className="text-white mb-3">
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
				<label htmlFor="confirmEmail" className="text-white my-3">
					Confirmar Email
				</label>
				<input
					type="email"
					name="confirmEmail"
					id="confirmEmail"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
				/>
				{errors.confirmEmailError && (
					<p className="text-red-400">{errors.confirmEmailError}</p>
				)}
				<label htmlFor="pass" className="text-white my-3">
					Contraseña
				</label>
				<input
					type="password"
					name="pass"
					id="pass"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
				/>
				{errors.passError && (
					<p className="text-red-400 text-wrap">{errors.passError}</p>
				)}
				<label htmlFor="phone" className="text-white my-3">
					Telefono
				</label>
				<input
					type="text"
					name="phone"
					id="phone"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
					maxLength={10}
				/>
				{errors.phoneError && (
					<p className="text-red-400">{errors.phoneError}</p>
				)}
				<label htmlFor="country" className="text-white my-3">
					Pais
				</label>
				<select
					name="country"
					id="country"
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
					onChange={handleChange}
					defaultValue="Mexico"
					defaultChecked="Mexico"
				>
					{country.map((value, index) => (
						<option key={index} value={value} className="text-white">
							{value}
						</option>
					))}
				</select>
				{errors.countryError && (
					<p className="text-red-400">{errors.countryError}</p>
				)}
			</div>
			<button
				type="submit"
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded`}
			>
				Registrarte
			</button>
			<p className="text-white mt-4">
				¿Ya tienes una cuenta?{" "}
				<Link href="/login" className="text-blue-500">
					Iniciar sesión
				</Link>
			</p>
		</form>
	);
}

export default Register;
