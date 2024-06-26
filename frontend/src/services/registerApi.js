import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const isLoggedInApi = () => {
	const token = localStorage.getItem("udise");
	return token ? true : false;
};

export const signupApi = async (
	name,
	principal,
	principalPhoneNo,
	parikshaPramukh,
	parikshaPramukhPhoneNo,
	taluka,
	udise,
	password
) => {
	try {
		const response = await axios.post(`${backend_url}/register/signup`, {
			schoolName: name,
			principalName: principal,
			principalNo: principalPhoneNo,
			parikshaPramukhName: parikshaPramukh,
			parikshaPramukhNo: parikshaPramukhPhoneNo,
			taluka: taluka,
			udise: udise,
			password: password,
		});

		if (response.data.success) {
			localStorage.removeItem("username");
			localStorage.setItem("udise", response.data.udise);
			notifications.clean();
			notifications.show({
				title: "Success",
				message: "Logging you In",
				withCloseButton: true,
				color: "green",
				autoClose: 2000,
			});
			return true;
		} else {
			console.log(response);
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "User Already Exists with this UDISE id",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

export const loginApi = async (udise, password) => {
	try {
		const response = await axios.get(`${backend_url}/register/login`, {
			params: {
				udise: udise,
				password: password,
			},
		});

		if (response.data.success) {
			localStorage.removeItem("username");
			localStorage.setItem("udise", response.data.Udise);
			notifications.clean();
			notifications.show({
				title: "Success",
				message: "Logging you In",
				withCloseButton: true,
				color: "green",
				autoClose: 2000,
			});
			return true;
		} else if (response.data.message === "User does not exist") {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "User is not registered",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
		} else if (response.data.message === "Invalid password") {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Invalid Password",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
		}
		return false;
	} catch (error) {
		console.log(error);
	}
};
export const adminSignupApi = async (name, username, password) => {
	try {
		const response = await axios.post(`${backend_url}/register/adminsignup`, {
			name: name,
			username: username,
			password: password,
		});

		if (response.data.success) {
			localStorage.removeItem("udise");
			localStorage.setItem("username", response.data.username);
			notifications.clean();
			notifications.show({
				title: "Success",
				message: "Logging you In",
				withCloseButton: true,
				color: "green",
				autoClose: 2000,
			});
			return;
		} else {
			console.log(response);
			notifications.clean();
			notifications.show({
				title: "Error",
				message: `${response.data.message}`,
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

export const adminLoginApi = async (username, password) => {
	try {
		const response = await axios.get(`${backend_url}/register/adminlogin`, {
			params: {
				username: username,
				password: password,
			},
		});

		if (response.data.success) {
			localStorage.removeItem("udise");
			localStorage.setItem("username", response.data.username);
			notifications.clean();
			notifications.show({
				title: "Success",
				message: "Logging you In",
				withCloseButton: true,
				color: "green",
				autoClose: 2000,
			});
			return true;
		} else if (response.data.message === "User does not exist") {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "User is not registered",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return false;
		} else if (response.data.message === "Invalid password") {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Invalid Password",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};
export const forgetPasswordRequest = async (udise) => {
	try {
		const response = await axios.get(`${backend_url}/register/forgetpassword`, {
			params: { udise: udise },
		});
		console.log(response.data.success);
		if (response.data.success) {
			return true;
		}
		notifications.clean();
		notifications.show({
			title: "Error",
			message: response.data.message,
			withCloseButton: true,
			color: "red",
			autoClose: 2000,
		});

		return false;
	} catch (error) {
		console.log(error);
	}
};
export const resetPassword = async (udise, password) => {
	console.log(password);
	try {
		const response = await axios.post(`${backend_url}/register/reset`, {
			udise: udise,
			password: password,
		});
		if (response.data.success) {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Password reset success",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return true;
		}
		notifications.clean();
		notifications.show({
			title: "Error",
			message: response.data.message,
			withCloseButton: true,
			color: "red",
			autoClose: 2000,
		});
		return false;
	} catch (error) {
		console.log(error);
	}
};
