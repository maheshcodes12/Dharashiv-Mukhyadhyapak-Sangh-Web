import {
	TextInput,
	PasswordInput,
	Box,
	Button,
	Center,
	Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { adminLoginApi, adminSignupApi } from "../services/registerApi";
import { Link } from "react-router-dom";

export default function AdminRegister() {
	const [mode, setMode] = useState("login");
	const [username, setUsername] = useState();
	const [name, setName] = useState();
	const [password, setPassword] = useState();
	const [boxWidth, setBoxWidth] = useState("30%");

	useEffect(() => {
		// Function to handle window resize
		const handleResize = () => {
			if (window.innerWidth < 600) {
				setBoxWidth("80%");
			} else {
				setBoxWidth("30%");
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const frontendUrl = import.meta.env.VITE_FRONTEND_URI;

	const form = useForm({
		initialValues: {
			name: "",
			username: "",
			password: "",
		},
		validateInputOnChange: true,
		validate: {
			username: (value) => {
				value.length < 5 ? "Username have at least 5 letters" : null;
			},
			name: (value) => {
				if (mode === "signup") {
					let a = String(value);
					return a.length < 5 ? "Name must have at least 5 letters" : null;
				}
				return null;
			},
			password: (value) => {
				return value.length < 8
					? "Password must be at least 8 characters long"
					: null;
			},
		},
	});

	function handleSubmit(values) {
		const isValidForm = form.isValid();

		if (isValidForm) {
			const { name, username, password } = values;

			if (mode === "login") {
				adminLoginApi(username, password).then((res) => {
					if (res)
						setTimeout(() => {
							window.location.href = frontendUrl;
						}, [2000]);
				});
			} else {
				adminSignupApi(name, username, password).then((res) => {
					if (res)
						setTimeout(() => {
							window.location.href = frontendUrl;
						}, [2000]);
				});
			}
		} else {
			notifications.show({
				title: "Error",
				message: "Please correct the errors in the form",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
		}
	}

	return (
		<Box
			mx='auto'
			my='10%'
			style={{ width: boxWidth }}>
			<Center>
				<Text size='lg'>
					{mode === "login" ? "Login for Admin" : "Register for Admin"}
				</Text>
			</Center>
			<Center mt='20'>
				<Link to='/'>
					<Box>Back To Home</Box>
				</Link>
			</Center>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				{mode == "signup" && (
					<TextInput
						my='md'
						label='Admin Name'
						onInput={(event) => setName(event.target.value)}
						{...form.getInputProps("name")}
						placeholder='Enter Your Name'
						required
					/>
				)}

				<TextInput
					label='Username'
					{...form.getInputProps("username")}
					onInput={(e) => {
						setUsername(e.target.value);
						form.setFieldValue("udise", e);
					}}
					placeholder='Enter username'
					hideControls
					withAsterisk
					my='md'
					required
				/>

				<PasswordInput
					label='Password'
					{...form.getInputProps("password")}
					onInput={(event) => setPassword(event.target.value)}
					placeholder='Enter password'
					withAsterisk
					my='md'
					required
				/>

				<Center>
					<Button
						type='submit'
						variant='gradient'
						gradient={{ from: "pink", to: "red", deg: 90 }}>
						Submit
					</Button>
				</Center>

				<Center>
					{mode == "login" ? (
						<Box
							mt='32'
							size='sm'
							w='100%'>
							<Center>
								Not Registered?{" "}
								<Text
									onClick={() => setMode("signup")}
									style={{ textDecoration: "underline", cursor: "pointer" }}
									px='8'>
									{"   "}
									Signup
								</Text>
							</Center>
						</Box>
					) : (
						<Box
							mt='32'
							size='sm'
							w='100%'>
							<Center>
								Already Registered?{" "}
								<Text
									onClick={() => setMode("login")}
									style={{ textDecoration: "underline", cursor: "pointer" }}
									px='8'>
									{"   "}
									Login
								</Text>
							</Center>
						</Box>
					)}
				</Center>
			</form>
		</Box>
	);
}
