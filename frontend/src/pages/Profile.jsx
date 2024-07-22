import React, { useEffect, useState } from "react";
import { Flex, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import {
	getAdminAccountData,
	getSchoolAccountData,
} from "../services/getAccountData";

const Profile = () => {
	const [udise, setUdise] = useState();
	const [username, setUsername] = useState();
	const [name, setName] = useState();
	const [principal, setPrincipal] = useState();
	const [principalPhoneNo, setPrincipalPhoneNo] = useState();
	const [parikshaPramukh, setParikshaPramukh] = useState();
	const [parikshaPramukhPhoneNo, setParikshaPramukhPhoneNo] = useState();
	const [taluka, setTaluka] = useState();
	const navigate = useNavigate();

	const a = localStorage.getItem("udise");
	const b = localStorage.getItem("username");
	useEffect(() => {
		setUdise(Number(a));
		setUsername(b);
		if (!a && !b) navigate("/register");
	}, [udise, username]);

	useEffect(() => {
		async function getData() {
			if (a && !b)
				getSchoolAccountData(a).then((res) => {
					if (res) {
						setName(res.schoolName);
						setTaluka(res.taluka);
						setPrincipal(res.principalName);
						setPrincipalPhoneNo(res.principalNo);
						setParikshaPramukh(res.parikshaPramukhName);
						setParikshaPramukhPhoneNo(res.parikshaPramukhNo);
					}
				});
			if (b && !a) {
				getAdminAccountData(b).then((res) => {
					setName(res);
				});
			}
		}
		getData();
	}, []);

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
						{a && !b && (
							<div>
								<div>School Name - {name}</div>
								<div>Taluka - {taluka}</div>
								<div>Principal - {principal}</div>
								<div>Principal's Phone No - {principalPhoneNo}</div>
								<div>Pariksha Pramukh - {parikshaPramukh}</div>
								<div>
									Pariksha Pramukh's Phone No - {parikshaPramukhPhoneNo}
								</div>
								<div>Udise - {udise}</div>
							</div>
						)}
						{b && !a && (
							<div>
								<div>Name - {name}</div>
								<div>Username - {username}</div>
							</div>
						)}
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
