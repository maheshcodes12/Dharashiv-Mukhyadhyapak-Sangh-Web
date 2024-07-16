import { AppShell, Burger, Box } from "@mantine/core";
import { Table, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import {
	getStudentsData,
	setStudentsDataAPI,
} from "../services/studentsDataApi";
import { getPriceData } from "../services/priceAPI";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Noticeboard() {
	const [opened, { toggle }] = useDisclosure();
	const [examType, setExamType] = useState();
	const [submitted, setSubmitted] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [value, setValue] = useState();
	const [selectedYear, setSelectedYear] = useState();
	const [prices, setPrices] = useState();
	const [studentsData, setStudentsData] = useState();
	const [readyToDownload, setReadyToDownload] = useState(false);
	const [schoolName, setSchoolName] = useState();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("udise");
		if (!isLoggedIn) {
			window.location.href = `${import.meta.env.VITE_FRONTEND_URI}/register`;
		}
		async function getijf() {
			const a = await getSchoolAccountData(localStorage.getItem("udise"));
			setSchoolName(a.schoolName);
			console.log(a);
		}
		getijf();
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
				console.log(a, b);
				if (a && b) setReadyToDownload(true);
				else setReadyToDownload(false);
				console.log(readyToDownload);
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

	function handleDownloadPDF() {
		// Sample 2D array data for the table
		const currentDate = new Date();
		const formattedDate = `${currentDate.getDate()}/${
			currentDate.getMonth() + 1
		}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

		const tableData = [
			[
				"Class",
				"Marathi Medium",
				"Other Medium",
				"Price",
				"San Hindi",
				"Sanskrit",
				"Total Students",
				"Total Price",
			],
			...studentsData.map((item, index) => [
				item.class,
				item.marathiMedium,
				item.otherMedium,
				prices[index].price,
				item.sanHindi,
				item.sanskrit,
				item.totalStudents,
				item.totalPrice,
			]),
		];

		// Define the document
		const docDefinition = {
			content: [
				{ text: `School Name:${schoolName}`, style: "header" },
				{ text: `Time when downloaded:${formattedDate}`, style: "header" },
				{ text: `Exam:${examType}`, style: "header" },
				{ text: `Academic Year:${selectedYear}}`, style: "header" },
				{
					table: {
						headerRows: 1,
						body: tableData,
					},
				},
				{ text: `TOTAL Price : ${totalPrice}`, style: "header" },
			],
			styles: {
				header: {
					fontSize: 10,
					margin: [0, 0, 0, 10],
				},
				tableExample: {
					margin: [0, 5, 0, 15],
				},
				tableHeader: {
					fontSize: 8,
					color: "black",
				},
			},
		};

		// Generate the PDF
		pdfMake
			.createPdf(docDefinition)
			.download(`${localStorage.getItem("udise")}-${examType}-${selectedYear}`);
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
				<Flex
					w='100vw'
					gap='md'
					justify='flex-start'
					align='flex-start'
					direction='row'
					wrap='nowrap'>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom='sm'
						size='sm'
						px='20'
						py='35'
					/>

					<Header sx={{ alignSelf: "flex-start" }} />
				</Flex>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<Navbar />
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
						<Box mb='20'>Total price:{totalPrice}</Box>
						<Flex
							gap='xl'
							justify='center'
							align='center'
							direction='row'
							wrap='wrap'>
							<Box>
								<Button
									variant='gradient'
									my='lg'
									gradient={{ from: "pink", to: "red", deg: 90 }}
									onClick={() => {
										setSubmitted(!submitted);
										handleSubmit();
									}}>
									Submit
								</Button>
							</Box>
							<Box>
								<Button
									variant='gradient'
									disabled={!readyToDownload}
									my='lg'
									gradient={{ from: "pink", to: "red", deg: 90 }}
									onClick={handleDownloadPDF}>
									Download PDF
								</Button>
							</Box>
						</Flex>
					</>
				)}
			</AppShell.Main>
		</AppShell>
	);
}
