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

export const getTalukaWiseStudentsData = async (
	taluka,
	academicYear,
	examType
) => {
	try {
		const response = await axios.get(
			`${backend_url}/talukawisedata/getstudent`,
			{
				params: {
					taluka: taluka,
					academicYear: academicYear,
					examType: examType,
				},
			}
		);

		if (response) {
			return response.data?.data;
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
