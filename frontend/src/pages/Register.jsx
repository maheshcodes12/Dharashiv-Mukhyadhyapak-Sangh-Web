import {
	AppShell,
	Burger,
	TextInput,
	PasswordInput,
	NumberInput,
	Box,
	NativeSelect,
	Button,
	Center,
	Text,
	Group,
	Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { loginApi, signupApi } from "../services/registerApi";
import { Link } from "react-router-dom";

export default function Register() {
	const [mode, setMode] = useState("login");
	const [name, setName] = useState();
	const [principal, setPrincipal] = useState();
	const [principalPhoneNo, setPrincipalPhoneNo] = useState();
	const [parikshaPramukh, setParikshaPramukh] = useState();
	const [parikshaPramukhPhoneNo, setParikshaPramukhPhoneNo] = useState();
	const [taluka, setTaluka] = useState();
	const [udise, setUdise] = useState();
	const [password, setPassword] = useState();
	const [boxWidth, setBoxWidth] = useState("30%");
	const frontendUrl = import.meta.env.VITE_FRONTEND_URI;

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

	const form = useForm({
		initialValues: {
			name: "",
			principal: "",
			parikshaPramukh: "",
			phone1: "",
			phone2: "",
			udise: "",
			password: "",
		},
		validateInputOnChange: true,
		validate: {
			name: (value) => {
				if (mode === "signup") {
					return value.length < 5 ? "Name must have at least 5 letters" : null;
				}
				return null;
			},
			principal: (value) => {
				if (mode === "signup") {
					let a = String(value);
					return a.length < 5 ? "Name must have at least 5 letters" : null;
				}
				return null;
			},
			parikshaPramukh: (value) => {
				if (mode === "signup") {
					let a = String(value);
					return a.length < 5 ? "Name must have at least 5 letters" : null;
				}
				return null;
			},
			udise: (value) => {
				const stringUdise = String(value);
				return stringUdise.length != 11
					? "UDISE must be an 11-digit number"
					: null;
			},
			phone1: (value) => {
				if (mode === "signup") {
					const stringPhone1 = String(value);
					return stringPhone1.length !== 10
						? "Phone No. must be a 10-digit number"
						: null;
				}
				return null;
			},
			phone2: (value) => {
				if (mode === "signup") {
					const stringPhone2 = String(value);
					return stringPhone2.length !== 10
						? "Phone No. must be a 10-digit number"
						: null;
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
			const { name, principal, phone1, phone2, udise, password } = values;

			if (mode === "login") {
				loginApi(udise, password).then((res) => {
					console.log(res);
					if (res)
						setTimeout(() => {
							window.location.href = frontendUrl;
						}, [2000]);
				});
			} else {
				signupApi(
					name,
					principal,
					phone1,
					parikshaPramukh,
					phone2,
					taluka,
					udise,
					password
				).then((response) => {
					if (response)
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
				<Text size='lg'>{mode === "login" ? "Login" : "Register"}</Text>
			</Center>
			<Center mt='20'>
				<Link to='/'>
					<Box>Back To Home</Box>
				</Link>
			</Center>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				{mode == "signup" && (
					<>
						<TextInput
							my='md'
							label='School Name'
							onInput={(event) => setName(event.target.value)}
							{...form.getInputProps("name")}
							placeholder='Enter School Name'
							required
						/>
						<NativeSelect
							label='Taluka'
							withAsterisk
							value={taluka}
							onChange={(event) => {
								setTaluka(event.currentTarget.value);
							}}
							data={[
								"Dharashiv",
								"Tuljapur",
								"Omerga",
								"Lohara",
								"Kallamb",
								"Bhoom",
								"Paranda",
								"Washi",
							]}
						/>
						<TextInput
							my='md'
							label="Principal's Name"
							{...form.getInputProps("principal")}
							placeholder="Enter Principal's Name"
							onInput={(e) => {
								setPrincipal(e.target.value);
							}}
							required
						/>
						<NumberInput
							label='Phone No.'
							{...form.getInputProps("phone1")}
							onChange={(e) => {
								setPrincipalPhoneNo(e);
								form.setFieldValue("phone1", e);
							}}
							placeholder='Enter Phone No.'
							hideControls
							withAsterisk
							my='md'
							inputSize='10'
							required
						/>
						<Divider
							size='md'
							orientation='vertical'
						/>
						<TextInput
							my='md'
							label='परीक्षा विभाग प्रमुख नाव'
							onInput={(e) => {
								setParikshaPramukh(e.target.value);
							}}
							{...form.getInputProps("parikshaPramukh")}
							placeholder=''
							required
						/>
						<NumberInput
							label='Phone No.'
							{...form.getInputProps("phone2")}
							onChange={(e) => {
								setParikshaPramukhPhoneNo(e);
								form.setFieldValue("phone2", e);
							}}
							placeholder='Enter Phone no.'
							hideControls
							withAsterisk
							my='md'
							inputSize='10'
							required
						/>
					</>
				)}

				<NumberInput
					label='UDISE No.'
					{...form.getInputProps("udise")}
					onChange={(e) => {
						setUdise(e);
						form.setFieldValue("udise", e);
					}}
					placeholder='Enter Udise no.'
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
					<Box
						mt='32'
						size='sm'
						w='100%'>
						<Center>
							<Link to='/resetpassword'>
								<Text
									style={{ textDecoration: "underline", cursor: "pointer" }}
									px='8'>
									{"   "}
									Forget Password?
								</Text>
							</Link>
						</Center>
					</Box>
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
