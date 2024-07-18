import { Box } from "@mantine/core";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getTimetable, setTimetable } from "../services/timetableApi";

const TimetableEntry = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const [timetableData, setTimetableData] = useState([]);
	const [selectedYear, setSelectedYear] = useState();
	const [examType, setExamType] = useState();
	const [response, setResponse] = useState();

	useEffect(() => {
		async function getData() {
			if (selectedYear && examType) {
				const newtimetableData = await getTimetable(selectedYear);
				setResponse(newtimetableData);
				for (let i = 0; i < newtimetableData.examSchedule.length; i++) {
					const element = newtimetableData.examSchedule[i];

					if (element.name.trim() === examType.trim()) {
						setTimetableData(element.schedule);
						return;
					} else setTimetableData([]);
				}
			}
		}
		getData();
	}, [selectedYear, examType]);

	function handletimetableDataChange(event, changeType, index) {
		const newtimetableData = [...timetableData];
		switch (changeType) {
			case "date":
				newtimetableData[index].date = event.target.innerText.trim();
				break;
			case "timeFrom":
				newtimetableData[index].timeFrom = event.target.innerText.trim();
				break;
			case "timeTo":
				newtimetableData[index].timeTo = event.target.innerText.trim();
				break;
			case "subject":
				newtimetableData[index].subject = event.target.innerText.trim();
				break;
			case "marks":
				newtimetableData[index].marks = Number(event.target.innerText);
				break;

			default:
				break;
		}

		setTimetableData(newtimetableData);
	}

	// timetableData - exams
	// timetable - examschedule -- --full schedule array

	function handleSubmit() {
		const responseRecieved = response;
		let examsScheduleProp = [...response?.examSchedule];
		if (selectedYear && examType) {
			for (let i = 0; i < responseRecieved?.examSchedule.length; i++) {
				const element = responseRecieved.examSchedule[i];
				if (element.name.trim() === examType.trim()) {
					examsScheduleProp?.examSchedule = timetableData;
					break;
				}
			}
			const exams = [...responseRecieved?.exams] || [];

			for (let i = 0; i < exams.length; i++) {
				if (exams[i].examName.trim() === examType.trim()) {
					const lengthOfSchedule = examsScheduleProp.examSchedule.length;
					exams[i].from = examsScheduleProp.examSchedule[0].date;
					exams[i].to =
						examsScheduleProp.examSchedule[lengthOfSchedule - 1].date;
					break;
				}
			}
			if (examsScheduleProp?.examSchedule?.length > 0 && exams.length > 0)
				setTimetable(selectedYear.trim(), exams, examsScheduleProp);
		}
	}

	const timetableArray = timetableData?.map((element, index) => (
		<React.Fragment key={element.class}>
			<Table.Tr>
				<Table.Td
					contentEditable
					onBlur={(e) => handletimetableDataChange(e, "date", index)}>
					{element.date}
				</Table.Td>
				<Table.Td
					contentEditable
					onBlur={(e) => handletimetableDataChange(e, "timeFrom", index)}>
					{element.timeFrom}
				</Table.Td>
				<Table.Td
					contentEditable
					onBlur={(e) => handletimetableDataChange(e, "timeTo", index)}>
					{element.timeTo}
				</Table.Td>
				<Table.Td
					contentEditable
					onBlur={(e) => handletimetableDataChange(e, "subject", index)}>
					{element.subject}
				</Table.Td>
				<Table.Td
					contentEditable
					onBlur={(e) => handletimetableDataChange(e, "marks", index)}>
					{element.marks}
				</Table.Td>
			</Table.Tr>
		</React.Fragment>
	));

	return (
		<>
			<div>
				<Select
					label='Exam'
					placeholder='Select exam for editing prices'
					data={[
						"प्रथम घटक चाचणी 5वी ते 8वी ",
						"प्रथम घटक चाचणी 9वी ते 10वी",
						"प्रथम सत्र परीक्षा 5वी ते 8वी",
						"प्रथम सत्र परीक्षा 9वी ते 10वी",
						"पूर्व परीक्षा इयत्ता 10वी",
						"सराव परीक्षा इयत्ता 10वी",
						"द्वितीय घटक चाचणी 5वी ते 8वी",
						"द्वितीय घटक चाचणी 9वी",
						"द्वितीय सत्र परीक्षा 9वी",
						"द्वितीय सत्र परीक्षा 5वी ते 8वी",
					]}
					onChange={(value) => {
						setExamType(value);
					}}
					searchable
				/>
			</div>
			<Select
				label='Year'
				placeholder='Select Academic Year'
				data={["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"]}
				onChange={(value) => {
					setSelectedYear(value);
				}}
				searchable
			/>

			<>
				<Box
					my='xl'
					component='div'>
					<Table striped>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Date </Table.Th>
								<Table.Th>Start time </Table.Th>
								<Table.Th>End time </Table.Th>
								<Table.Th>Subject </Table.Th>
								<Table.Th>Marks </Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{timetableArray}</Table.Tbody>
					</Table>
				</Box>
				<Button
					variant='gradient'
					my='lg'
					mx='50%'
					gradient={{ from: "pink", to: "red", deg: 90 }}
					onClick={() => {
						handleSubmit();
					}}>
					Submit
				</Button>
			</>
		</>
	);
};

export default TimetableEntry;
