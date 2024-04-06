"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/utils/cookies";
import { validatePassword } from "@/utils/validatePass";
import axios from "axios";

function ChangePass() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: "",
		pass: "",
		confirmPass: "",
	});

	const [errors, setErrors] = useState({
		emailError: "",
		passError: "",
		confirmPassError: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (formData.email === "") {
			setErrors({ ...errors, emailError: "Por favor ingresa el email" });
			return;
		}
		const passwordError = validatePassword(formData.pass);
		if (passwordError) {
			setErrors({ ...errors, passError: passwordError });
		}
		const confirmPassError = validatePassword(formData.confirmPass);
		if (confirmPassError) {
			setErrors({ ...errors, confirmPassError });
		}
		if (formData.pass !== formData.confirmPass) {
			setErrors({
				...errors,
				confirmPassError: "Las contrasenas no coinciden",
			});
			return;
		}
		try {
			const res = await axios.post("http://localhost:4000/changePass", {
				email: formData.email,
				pass: formData.pass,
			});
			console.log(res);
			alert("Contrasena cambiada");
			router.push("/login");
		} catch (error) {
			console.error(error);
		}
	};

	const [isValidated, setIsValidated] = useState(false);
	const params = useParams();

	useEffect(() => {
		const expectedToken = getCookie("token");
		if (params.token === expectedToken) {
			setIsValidated(true);
			deleteCookie("token");
		}
	}, []);

	return isValidated ? (
		<form
			className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg"
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
			</div>
			<div className="m-2 flex flex-col">
				<label htmlFor="pass" className="text-white mb-3">
					Contrasena
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
			<div className="m-2 flex flex-col">
				<label htmlFor="confirmPass" className="text-white mb-3">
					Confirmar contrasena
				</label>
				<input
					type="password"
					name="confirmPass"
					id="confirmPass"
					onChange={handleChange}
					className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-700"
				/>
				{errors.confirmPassError && (
					<p className="text-red-400">{errors.confirmPassError}</p>
				)}
			</div>
			<button
				type="submit"
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded`}
			>
				Cambiar
			</button>
		</form>
	) : (
		<h1>No deberias de estar aqui</h1>
	);
}

export default ChangePass;
