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
import {
	loginApi,
	resetPassword,
	signupApi,
	forgetPasswordRequest,
} from "../services/registerApi";
import { Link } from "react-router-dom";

const ResetPassword = () => {
	const [password, setPassword] = useState();
	const [mode, setMode] = useState("validate");
	const [udise, setUdise] = useState();
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
			udise: "",
			password: "",
		},
		validateInputOnChange: true,
		validate: {
			udise: (value) => {
				const stringUdise = String(value);
				if (mode === "validate")
					return stringUdise.length != 11
						? "UDISE must be an 11-digit number"
						: null;
				return null;
			},
			password: (value) => {
				if (mode === "reset")
					return value.length < 8
						? "Password must be at least 8 characters long"
						: null;
				return null;
			},
		},
	});

	async function handleSubmit(values) {
		const isValidForm = form.isValid();

		if (isValidForm) {
			const { udise, password } = values;
			if (mode === "validate") {
				await forgetPasswordRequest(udise).then((res) => {
					if (res) setMode("reset");
				});
			} else {
				const a = await resetPassword(udise, password);
				if (a)
					await loginApi(udise, password).then((res) => {
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
					{mode === "validate" ? "Enter Udise" : "Enter New password"}
				</Text>
			</Center>
			<Center mt='20'>
				<Link to='/'>
					<Box>Back To Home</Box>
				</Link>
			</Center>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				{mode === "validate" && (
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
				)}
				{mode === "reset" && (
					<PasswordInput
						label='New Password'
						{...form.getInputProps("password")}
						onInput={(event) => setPassword(event.target.value)}
						placeholder='Enter new password'
						withAsterisk
						my='md'
						required
					/>
				)}
				<Center>
					<Button
						type='submit'
						variant='gradient'
						gradient={{ from: "pink", to: "red", deg: 90 }}>
						Submit
					</Button>
				</Center>
			</form>
		</Box>
	);
};

export default ResetPassword;
