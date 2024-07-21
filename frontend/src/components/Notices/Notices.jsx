import React, { useEffect, useMemo, useState } from "react";
import {
	Flex,
	Text,
	Table,
	Timeline,
	Textarea,
	Button,
	Center,
} from "@mantine/core";
import ScholarshipNotice from "./ScholarshipNotice";
import BoardPreviousYearPapers from "./BoardPreviousYearPapers";
import { getNoticeApi, setNewNotice } from "../../services/newNoticeApi";

const Notices = () => {
	const [newNoticeTitle, setNewNoticeTitle] = useState();
	const [newNoticeText, setNewNoticeText] = useState();
	const [noticeArray, setNoticeArray] = useState();
	const adminLogin = localStorage.getItem("username");

	let date = new Date();
	let day = date.getDate().toString().padStart(2, "0");
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let year = date.getFullYear();
	let formattedDate = `${day}/${month}/${year}`;

	const handleSaveNewNotice = async () => {
		if (newNoticeText && newNoticeTitle) {
			setNewNotice(newNoticeTitle, newNoticeText, formattedDate);
		}
	};

	useEffect(() => {
		async function getNotices() {
			const noticesArray = await getNoticeApi();
			setNoticeArray(noticesArray);
			console.log(noticeArray);
		}
		getNotices();
	}, []);

	const noticeElements = noticeArray?.map((element, index) => (
		<Timeline.Item
			key={index}
			title={`${element.time}`}>
			<h5>{element.noticeTitle}</h5>
			<Text>{element.noticeText}</Text>
		</Timeline.Item>
	));

	return (
		<Flex
			gap='md'
			direction='column'
			wrap='wrap'
			p='lg'>
			<Timeline
				color='pink'
				active={2}
				lineWidth={1}
				bulletSize={18}>
				{adminLogin && (
					<Timeline.Item title={`${formattedDate}`}>
						<div>
							<Textarea
								label='Add New Notice Title'
								placeholder='Input Title that will be diaplayed on home page'
								autosize
								minRows={2}
								maxLength={1000}
								value={newNoticeTitle}
								onChange={(event) =>
									setNewNoticeTitle(event.currentTarget.value)
								}
							/>
							<Textarea
								label='Add New Notice'
								placeholder='Input detailed notice'
								autosize
								minRows={6}
								maxLength={1000}
								value={newNoticeText}
								onChange={(event) =>
									setNewNoticeText(event.currentTarget.value)
								}
							/>
							<Center mt={12}>
								<Button onClick={handleSaveNewNotice}>Save</Button>
							</Center>
						</div>
					</Timeline.Item>
				)}
				{noticeElements}
				<Timeline.Item title={`21/7/2024`}>
					<ScholarshipNotice />
				</Timeline.Item>

				<Timeline.Item title='20/7/2024'>
					<BoardPreviousYearPapers />
				</Timeline.Item>
			</Timeline>
		</Flex>
	);
};

export default Notices;
