import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const getTimetable = async (academicYear) => {
	try {
		const response = await axios.get(`${backend_url}/timetable/get`, {
			params: { academicYear: academicYear.trim() },
		});

		if (response.data.success) {
			return response.data.data[0];
		} else {
			console.log(response);
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Error while getting timetables",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const setTimetable = async (academicYear, timetableData, timeTable) => {
	try {
		const response = await axios.post(`${backend_url}/timetable/set`, {
			academicYear: academicYear,
			exams: timetableData,
			examSchedule: timeTable,
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
