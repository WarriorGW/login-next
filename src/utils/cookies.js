const setCookie = (name, value, hours) => {
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + hours * 60 * 60 * 1000);

	const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
	document.cookie = cookieValue;
};

const getCookie = (name) => {
	const cookies = document.cookie.split("; ");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split("=");
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return null;
};

const deleteCookie = (name) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export { getCookie, setCookie, deleteCookie };
