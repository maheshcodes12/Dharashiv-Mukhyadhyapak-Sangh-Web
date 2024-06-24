import React, { useState, useEffect, useMemo } from "react";
import { Table, Select, Button, Center } from "@mantine/core";
import {
	getStudentsDataForAdmin,
	getTalukaWiseData,
} from "../services/talukaWiseData";
import { Link } from "react-router-dom";
import { getPriceData } from "../services/priceAPI";

const AdminData = () => {
	const [SchoolsData, setSchoolsData] = useState([]);
	const [studentsData, setStudentsData] = useState([]);
	const [examType, setExamType] = useState();
	const [selectedYear, setSelectedYear] = useState();
	const [selectedRow, setSelectedRow] = useState(null);
	const [selectedSchool, setSelectedSchool] = useState(null);
	const [priceData, setPriceData] = useState();

	const Taluka = useMemo(
		() => [
			"Dharashiv",
			"Tuljapur",
			"Omerga",
			"Lohara",
			"Kallamb",
			"Bhoom",
			"Paranda",
			"Vashi",
		],
		[]
	);
	console.log(SchoolsData);
	// Row ---- Taluka
	// School ---- School
	//
	useEffect(() => {
		async function getData() {
			if (selectedRow) {
				const data = await getTalukaWiseData(selectedRow);
				setSchoolsData(data || []);
			}
		}
		getData();
	}, [selectedRow]);

	useEffect(() => {
		async function getData() {
			if (selectedSchool && selectedYear && examType) {
				const data = await getStudentsDataForAdmin(
					selectedSchool,
					selectedYear,
					examType?.trim()
				);
				const pdata = await getPriceData(selectedYear, examType?.trim());

				setStudentsData(data || []);
				setPriceData(pdata || []);
				console.log(priceData);
				console.log(studentsData);
			}
		}
		getData();
	}, [selectedSchool, selectedYear, examType]);

	const handleRowClick = (element) => {
		setSelectedRow(element === selectedRow ? null : element);
	};

	const handleSchoolClick = (udise) => {
		setSelectedSchool(udise === selectedSchool ? null : udise);
	};

	const schools = useMemo(() => {
		return SchoolsData?.map(
			(element, index) =>
				index > 0 && (
					<React.Fragment key={element.examschoolName}>
						<Table.Tr
							onClick={() => handleSchoolClick(element.udise)}
							cursor='pointer'>
							<Table.Td>{index}</Table.Td>
							<Table.Td>{element.schoolName}</Table.Td>
							<Table.Td>{element.principalName}</Table.Td>
							<Table.Td>{element.principalNo}</Table.Td>
							<Table.Td>{element.parikshaPramukhName}</Table.Td>
							<Table.Td>{element.parikshaPramukhNo}</Table.Td>
							<Table.Td>get students data</Table.Td>
							<Table.Td>{element.udise}</Table.Td>
						</Table.Tr>
					</React.Fragment>
				)
		);
	}, [SchoolsData, selectedSchool]);

	const studentsDataElement = useMemo(() => {
		return studentsData?.map((element, index) => (
			<React.Fragment key={element.examschoolName}>
				<Table.Tr>
					<Table.Td>{element.class}</Table.Td>
					<Table.Td>{element.marathiMedium}</Table.Td>
					<Table.Td>{element.otherMedium}</Table.Td>
					<Table.Td>{priceData[index]?.price}</Table.Td>
					<Table.Td>{element.sanHindi}</Table.Td>
					<Table.Td>{element.sanskrit}</Table.Td>
					<Table.Td>{element.totalPrice}</Table.Td>
					<Table.Td>{element.totalStudents}</Table.Td>
				</Table.Tr>
			</React.Fragment>
		));
	}, [studentsData, selectedYear, examType]);

	const talukaWiseDetail = useMemo(() => {
		return Taluka?.map((element, index) => (
			<React.Fragment key={element}>
				<Table.Tr
					className={index % 4 < 2 ? "red-row" : "blue-row"}
					onClick={() => handleRowClick(element)}
					style={{ cursor: "pointer" }}>
					<Table.Td>{element}</Table.Td>
				</Table.Tr>
				{selectedRow === element && (
					<Table.Tr>
						<Table.Td colSpan='8'>
							<div>
								<Table
									verticalSpacing='lg'
									captionSide='bottom'
									mb='44'>
									<Table.Thead>
										<Table.Tr>
											<Table.Th>Serial No.</Table.Th>
											<Table.Th>School</Table.Th>
											<Table.Th>Principal</Table.Th>
											<Table.Th>Principal No.</Table.Th>
											<Table.Th>Pariksha Pramukh</Table.Th>
											<Table.Th>Pariksha Pramukh No.</Table.Th>
											<Table.Th>Data Entered</Table.Th>
											<Table.Th>Udise</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>{schools}</Table.Tbody>
								</Table>
							</div>
						</Table.Td>
					</Table.Tr>
				)}
			</React.Fragment>
		));
	}, [Taluka, selectedRow, schools]);

	return (
		<>
			{selectedSchool && (
				<Center my='30'>
					<Button
						onClick={() => {
							setSelectedYear(null);
							setSelectedRow(null);
							setSelectedSchool(null);
						}}>
						Back
					</Button>
				</Center>
			)}
			{!selectedSchool && (
				<Center my='30'>
					<Link to='/'>
						<Button>Back</Button>
					</Link>
				</Center>
			)}
			<div>
				{!selectedSchool && (
					<Table
						striped
						className='custom-table'
						highlightOnHover
						verticalSpacing='lg'
						captionSide='bottom'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Select Taluka</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{talukaWiseDetail}</Table.Tbody>
					</Table>
				)}
				{selectedSchool && (
					<div>
						<Select
							label='Exam Name'
							placeholder='Select exam'
							data={[
								"1st Unit test",
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

						<Select
							label='Year'
							placeholder='Select Academic Year'
							data={["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"]}
							onChange={(value) => {
								setSelectedYear(value);
							}}
							searchable
						/>
						{examType && selectedYear && (
							<Table
								striped
								className='custom-table'
								highlightOnHover
								mt='40'
								verticalSpacing='lg'
								captionSide='bottom'>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Class</Table.Th>
										<Table.Th>Marathi Medium</Table.Th>
										<Table.Th>Hindi Medium</Table.Th>
										<Table.Th>Price</Table.Th>
										<Table.Th>Sanyukt Hindi</Table.Th>
										<Table.Th>Sanskrit</Table.Th>
										<Table.Th>Total Price</Table.Th>
										<Table.Th>Total Students</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{studentsDataElement}</Table.Tbody>
							</Table>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default AdminData;
