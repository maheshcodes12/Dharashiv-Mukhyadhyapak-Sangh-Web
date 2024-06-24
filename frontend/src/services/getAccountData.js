import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const getSchoolAccountData = async (udise) => {
	try {
		const response = await axios.get(`${backend_url}/account/school`, {
			params: {
				udise: udise,
			},
		});

		if (response.data.success) {
			return response.data.schoolData;
		}
		return false;
	} catch (error) {
		console.log(error);
	}
};

export const getAdminAccountData = async (username) => {
	try {
		const response = await axios.get(`${backend_url}/account/admin`, {
			params: {
				username: username,
			},
		});

		if (response.data.success) {
			return response.data.name;
		}
		return false;
	} catch (error) {
		console.log(error);
	}
};
