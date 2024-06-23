import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import "./timetable.css";
import { getTimetable } from "../services/timetableApi";

const Timetable = () => {
	const [timetableData, setTimetableData] = useState();
	const [timeTable, settimeTable] = useState();

	useEffect(() => {
		async function getData() {
			const a = await getTimetable("2024-25").then((res) => {
				setTimetableData(res.exams);
				settimeTable(res.examSchedule);
			});
		}

		getData();
	}, []);

	const [selectedRow, setSelectedRow] = useState(null);
	const [array, setArray] = useState([]);

	useEffect(() => {
		for (let i = 0; i < timeTable?.length; i++) {
			const element = timeTable[i];

			if (
				element?.name.trim() === timetableData[selectedRow]?.examName.trim()
			) {
				setArray(element?.schedule);
				break;
			} else {
				setArray([]);
			}
		}
	}, [selectedRow]);

	const handleRowClick = (index) => {
		setSelectedRow(index === selectedRow ? null : index);
	};

	const ExamDetail = array?.map((element, index) => (
		<React.Fragment key={element.examName}>
			<Table.Tr>
				<Table.Td>{index + 1}</Table.Td>
				<Table.Td>{element.date}</Table.Td>
				<Table.Td>{element.timeFrom}</Table.Td>
				<Table.Td>{element.timeTo}</Table.Td>
				<Table.Td>{element.subject}</Table.Td>
				<Table.Td>{element.marks}</Table.Td>
			</Table.Tr>
		</React.Fragment>
	));

	const Exams = timetableData?.map((element, index) => (
		<React.Fragment key={element.examName}>
			<Table.Tr
				className={index % 4 < 2 ? "red-row" : "blue-row"}
				onClick={() => handleRowClick(index)}
				style={{ cursor: "pointer" }}>
				<Table.Td>{element.examName}</Table.Td>
				<Table.Td>{element.from}</Table.Td>
				<Table.Td>{element.to}</Table.Td>
			</Table.Tr>
			{selectedRow === index && (
				<Table.Tr>
					<Table.Td colSpan='3'>
						<div>
							<Table
								verticalSpacing='lg'
								captionSide='bottom'
								mb='44'>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Serial</Table.Th>
										<Table.Th>Date</Table.Th>
										<Table.Th>Time From</Table.Th>
										<Table.Th>Time To</Table.Th>
										<Table.Th>Subject</Table.Th>
										<Table.Th>Marks</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{ExamDetail}</Table.Tbody>
							</Table>
						</div>
					</Table.Td>
				</Table.Tr>
			)}
		</React.Fragment>
	));

	return (
		<div>
			<Table
				striped
				className='custom-table'
				highlightOnHover
				verticalSpacing='lg'
				captionSide='bottom'>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Exam Name</Table.Th>
						<Table.Th>From Date</Table.Th>
						<Table.Th>To Date</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{Exams}</Table.Tbody>
				<Table.Tfoot>
					{"**Timetable can update. Visit regularly for timely updates."}
				</Table.Tfoot>
			</Table>
		</div>
	);
};

export default Timetable;
