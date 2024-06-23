import React, { useEffect, useState } from "react";
import { Flex, Box, Button } from "@mantine/core";
import { isLoggedInApi } from "../services/registerApi";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { notifications } from "@mantine/notifications";

const Profile = () => {
	const [udise, setUdise] = useState();
	const [username, setUsername] = useState();
	const a = localStorage.getItem("udise");
	const b = localStorage.getItem("username");
	useEffect(() => {
		setUdise(Number(a));
		setUsername(b);
		if (!a && !b)
			window.location.href = `${import.meta.env.VITE_FRONTEND_URI}/register`;
	}, [udise, username]);

	function handleLogout() {
		localStorage.removeItem("udise");
		localStorage.removeItem("username");
		notifications.clean();
		notifications.show({
			title: "Success",
			message: "Logged out Successfully",
			withCloseButton: true,
			color: "green",
			autoClose: 2000,
		});
		setTimeout(() => {
			window.location.href = `${import.meta.env.VITE_FRONTEND_URI}`;
		}, 2000);
	}
	return (
		<>
			<div>
				<Header />
			</div>
			<div
				style={{
					width: "100%",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				{(a || b) && (
					<Flex
						gap='md'
						justify='center'
						align='center'
						direction='column'
						wrap='nowrap'
						style={{ height: "100%" }}>
						{a && <div>Udise = {udise}</div>}
						{b && <div>Username = {username}</div>}
						<Link to='/'>
							<div>Back to Home</div>
						</Link>

						<Button onClick={handleLogout}>Logout</Button>
					</Flex>
				)}
			</div>
		</>
	);
};

export default Profile;
