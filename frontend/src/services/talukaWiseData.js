import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const getTalukaWiseData = async (taluka) => {
	try {
		const response = await axios.get(
			`${backend_url}/talukawisedata/getschool`,
			{
				params: { taluka: taluka },
			}
		);

		if (response.data.success) {
			console.log(response.data.data);
			return response.data.data;
		} else {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Error while getting data",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return response.data.success;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getStudentsDataForAdmin = async (
	udise,
	academicYear,
	examType
) => {
	try {
		const response = await axios.get(
			`${backend_url}/talukawisedata/getstudent`,
			{
				params: {
					udise: udise,
					academicYear: academicYear,
					examType: examType,
				},
			}
		);

		if (response.data.success) {
			return response.data.data.studentsData;
		} else {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Error while getting data",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return response.data.success;
		}
	} catch (error) {
		console.log(error);
	}
};
