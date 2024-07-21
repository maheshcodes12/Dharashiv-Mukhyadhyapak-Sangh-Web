import axios from "axios";
import { notifications } from "@mantine/notifications";

const backend_url = import.meta.env.VITE_BACKEND_URI;

export const setNewNotice = async (
	newNoticeTitle,
	newNoticeText,
	formattedDate
) => {
	console.log(newNoticeText, newNoticeTitle);
	try {
		if (String(newNoticeText).length < 10) {
			notifications.clean();
			notifications.show({
				title: "Error",
				message: "Please enter a valid notice (min 10 characters)",
				withCloseButton: true,
				color: "red",
				autoClose: 2000,
			});
			return;
		}
		const response = await axios.post(`${backend_url}/notice/set`, {
			noticeText: newNoticeText,
			noticeTitle: newNoticeTitle,
			time: formattedDate,
		});
		console.log(response);

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

export const getNoticeApi = async () => {
	try {
		const response = await axios.get(`${backend_url}/notice/get`);

		if (response.data.success) {
			notifications.clean();
			notifications.show({
				title: "Success",
				message: `${response.data.message}`,
				withCloseButton: true,
				color: "green",
				autoClose: 2000,
			});
			console.log(response);
			return response.data.notices;
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
