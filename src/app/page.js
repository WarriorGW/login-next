"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const username = document.cookie.replace(
			/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		if (!username) {
			router.push("/login");
		}
	}, []);
	return (
		<div>
			<p>Home</p>
		</div>
	);
}
