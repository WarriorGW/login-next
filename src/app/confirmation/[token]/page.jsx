"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { deleteCookie, getCookie } from "@/utils/cookies";

function Confirmation() {
	const [isValidated, setIsValidated] = useState(false);
	const params = useParams();
	console.log(params);

	useEffect(() => {
		const expectedToken = getCookie("token");
		if (params.token === expectedToken) {
			setIsValidated(true);
			deleteCookie("token");
		}
	}, []);
	return isValidated ? <h1>Validado</h1> : <h1>No validado</h1>;
}

export default Confirmation;
