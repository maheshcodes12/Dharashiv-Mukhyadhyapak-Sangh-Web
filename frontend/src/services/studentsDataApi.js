import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const getStudentsData = async (academicYear, udise, examType) => {
	try {
		const response = await axios.get(`${backend_url}/paperdata/get`, {
			params: {
				academicYear: academicYear,
				udise: Number(udise),
				examType: examType,
			},
		});

		if (response.data.success) {
			return response.data.data.studentsData;
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

export const setStudentsDataAPI = async (
	academicYear,
	udise,
	examType,
	studentsData
) => {
	try {
		const response = await axios.post(`${backend_url}/paperdata/set`, {
			academicYear: academicYear,
			udise: udise,
			examType: examType,
			studentsData: studentsData,
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
