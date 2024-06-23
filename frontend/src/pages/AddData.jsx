import { AppShell, Burger, Box } from "@mantine/core";
import "./styles.css";
import { Table } from "@mantine/core";
import { YearPicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import YearSelector from "../components/YearSelector";
import {
	getStudentsData,
	setStudentsDataAPI,
} from "../services/studentsDataApi";
import { getPriceData } from "../services/priceAPI";
import Header from "../components/Header";
export default function Noticeboard() {
	const [opened, { toggle }] = useDisclosure();
	const [examType, setExamType] = useState();
	const [submitted, setSubmitted] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [value, setValue] = useState();
	const [selectedYear, setSelectedYear] = useState();
	const [prices, setPrices] = useState();
	const [studentsData, setStudentsData] = useState();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("udise");
		if (!isLoggedIn) {
			window.location.href = `${import.meta.env.VITE_FRONTEND_URI}/register`;
		}
	}, []);

	function handleTableDataChange(e, change, index) {
		let newStudentsData = [...studentsData];
		switch (change) {
			case "marathi":
				newStudentsData[index].marathiMedium = Number(e.target.textContent);
				break;
			case "other":
				newStudentsData[index].otherMedium = Number(e.target.textContent);
				break;
			case "hindi":
				newStudentsData[index].sanHindi = Number(e.target.textContent);
				break;
			case "sanskrit":
				newStudentsData[index].sanskrit = Number(e.target.textContent);
				break;

			default:
				break;
		}
		setStudentsData(newStudentsData);
	}

	const rows = studentsData?.map((element, elementIndex) => (
		<>
			{elementIndex >= 0 && (
				<Table.Tr key={element.class}>
					<Table.Td>{element.class}</Table.Td>
					<Table.Td
						contentEditable={submitted ? false : true}
						onBlur={(e) => handleTableDataChange(e, "marathi", elementIndex)}>
						{element.marathiMedium}
					</Table.Td>
					<Table.Td
						contentEditable={submitted ? false : true}
						onBlur={(e) => handleTableDataChange(e, "other", elementIndex)}>
						{element.otherMedium}
					</Table.Td>
					<Table.Td>{element.totalStudents}</Table.Td>
					<Table.Td>{prices && prices[elementIndex]?.price}</Table.Td>
					<Table.Td>{element.totalPrice}</Table.Td>
					<Table.Td
						contentEditable
						onBlur={(e) => handleTableDataChange(e, "hindi", elementIndex)}>
						{element.sanHindi}
					</Table.Td>
					<Table.Td
						contentEditable
						onBlur={(e) => handleTableDataChange(e, "sanskrit", elementIndex)}>
						{element.sanskrit}
					</Table.Td>
				</Table.Tr>
			)}
		</>
	));

	useEffect(() => {
		async function getData() {
			const udise = localStorage.getItem("udise");
			const examName = examType?.trim();
			if (selectedYear && examName) {
				const a = await getStudentsData(selectedYear, udise, examName);
				const b = await getPriceData(selectedYear, examName);
				if (a) {
					setStudentsData(a);
				} else {
					const newStudentsData = [
						{
							class: "5th",
							marathiMedium: 0,
							otherMedium: 0,
							price: 0,
							sanHindi: 0,
							sanskrit: 0,
							totalStudents: 0,
							totalPrice: 0,
						},
						{
							class: "6th",
							marathiMedium: 0,
							otherMedium: 0,
							price: 0,
							sanHindi: 0,
							sanskrit: 0,
							totalStudents: 0,
							totalPrice: 0,
						},
						{
							class: "7th",
							marathiMedium: 0,
							otherMedium: 0,
							price: 0,
							sanHindi: 0,
							sanskrit: 0,
							totalStudents: 0,
							totalPrice: 0,
						},
						{
							class: "8th",
							marathiMedium: 0,
							otherMedium: 0,
							price: 0,
							sanHindi: 0,
							sanskrit: 0,
							totalStudents: 0,
							totalPrice: 0,
						},
						{
							class: "9th",
							marathiMedium: 0,
							otherMedium: 0,
							price: 0,
							sanHindi: 0,
							sanskrit: 0,
							totalStudents: 0,
							totalPrice: 0,
						},
						{
							class: "10th",
							marathiMedium: 0,
							otherMedium: 0,
							price: 0,
							sanHindi: 0,
							sanskrit: 0,
							totalStudents: 0,
							totalPrice: 0,
						},
					];
					setStudentsData(newStudentsData);
				}
				if (b) setPrices(b);
			}
		}
		getData();
	}, [selectedYear, examType]);

	function calculateTotalValues() {
		let sum = 0;
		for (let i = 0; i < studentsData?.length; i++) {
			const element = studentsData[i];
			element.totalStudents = element.marathiMedium + element.otherMedium;
			element.totalPrice = prices
				? element.totalStudents * prices[i]?.price
				: 0;
			sum += element.totalPrice;
		}
		setTotalPrice(sum);
	}

	useEffect(() => {
		calculateTotalValues();
	}, [studentsData]);

	async function handleSubmit() {
		const udise = localStorage.getItem("udise");
		const examName = examType?.trim();
		await setStudentsDataAPI(selectedYear, udise, examName, studentsData);
	}

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding='md'>
			<AppShell.Header>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom='sm'
					size='sm'
				/>
				<Header />
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<Link to='/notice'>Noticeboard</Link>
				<Link to='/entry'>Add data</Link>
			</AppShell.Navbar>

			<AppShell.Main>
				<div>
					<Select
						label='Exam'
						placeholder='Select exam for entering students data'
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
				{examType && selectedYear && (
					<>
						<Box
							my='xl'
							component='div'>
							<Box>
								एकदा विद्यार्थी संख्या भरल्यानंतर प्रश्नपत्रिका घेणे बंधनकरक
								राहील{" "}
							</Box>
							<hr />
							<Table striped>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>इयत्ता </Table.Th>
										<Table.Th>मराठी माध्यम </Table.Th>
										<Table.Th>सेमी/इंग्रजी माध्यम </Table.Th>
										<Table.Th>एकूण विद्यार्थी </Table.Th>
										<Table.Th>दर</Table.Th>
										<Table.Th>एकूण रक्कम </Table.Th>
										<Table.Th>संयुक्त हिन्दी </Table.Th>
										<Table.Th>संस्कृत </Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{rows}</Table.Tbody>
							</Table>
						</Box>
						<Box>Total price:{totalPrice}</Box>
						<Button
							variant='gradient'
							my='lg'
							mx='50%'
							gradient={{ from: "pink", to: "red", deg: 90 }}
							onClick={() => {
								setSubmitted(!submitted);
								handleSubmit();
							}}>
							Submit
						</Button>
					</>
				)}
			</AppShell.Main>
		</AppShell>
	);
}
