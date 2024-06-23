import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const getPriceData = async (academicYear, examType) => {
	try {
		const response = await axios.get(`${backend_url}/price/get`, {
			params: {
				academicYear: academicYear,
				examType: examType,
			},
		});

		if (response.data.success) {
			return response.data.data[0].prices;
		} else {
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

export const setPriceAPI = async (academicYear, examType, prices) => {
	try {
		const response = await axios.post(`${backend_url}/price/set`, {
			academicYear: academicYear.trim(),
			examType: examType.trim(),
			prices: prices,
		});

		if (response.data.success) {
			notifications.clean();
			notifications.show({
				title: "Success",
				message: `${response.data.message}`,
				withCloseButton: true,
				color: "green",
				autoClose: 2000,
			});
		} else {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: `${response.data.message}`,
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
		}
	} catch (error) {
		console.log(error);
	}
};
