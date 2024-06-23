import { AppShell, Burger, Box } from "@mantine/core";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import Header from "../components/Header";
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

	function handletimetableDataChange(event, changeType, index) {
		const newtimetableData = [...timetableData];
		switch (changeType) {
			case "date":
				newtimetableData[index].date = event.target.innerText;
				break;
			case "timeFrom":
				newtimetableData[index].timeFrom = event.target.innerText;
				break;
			case "timeTo":
				newtimetableData[index].timeTo = event.target.innerText;
				break;
			case "subject":
				newtimetableData[index].subject = event.target.innerText;
				break;
			case "marks":
				newtimetableData[index].marks = event.target.innerText;
				break;

			default:
				break;
		}
        
		setTimetableData(newtimetableData);
	}

	function handleSubmit() {
		if (timetableData) {
            const newExamSchedule = [...response.examSchedule]
			setTimetable(selectedYear,response.exams,newExamSchedule);
		}
	}

	return (
		<>
			<div>
				<Select
					label='Exam'
					placeholder='Select exam for editing prices'
					data={[
						"प्रथम घटक चाचणी 5वी ते 8वी ",
						"Mid-term",
						"2nd Unit test",
						"Final Exam (5th to 9th)",
						"10th सराव 1",
						"10th सराव 2 ",
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
