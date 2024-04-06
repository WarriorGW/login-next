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
		error = "La contraseña debe contener al menos:";
	}

	if (!uppercaseRegex.test(password)) {
		error += " Una letra mayúscula.";
	}
	if (!lowercaseRegex.test(password)) {
		error += " Una letra minúscula.";
	}
	if (!numberRegex.test(password)) {
		error += " Un número.";
	}
	if (!specialCharRegex.test(password)) {
		error += " Un carácter especial.";
	}
	if (password.length < minLength) {
		error += " Una longitud mínima de 6 caracteres.";
	}

	return error;
};

const validatePhone = (phone) => {
	const phoneRegex = /^[0-9]{10}$/;

	if (!phone) {
		return "Por favor ingresa el número de teléfono.";
	}

	if (!phoneRegex.test(phone)) {
		return "Debe contener 10 dígitos numericos.";
	}

	return "";
};

export { validatePassword, validatePhone };
