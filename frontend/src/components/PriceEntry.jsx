import { Box } from "@mantine/core";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { getPriceData, setPriceAPI } from "../services/priceAPI";

const PriceEntry = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const [priceData, setPriceData] = useState([]);
	const [selectedYear, setSelectedYear] = useState();
	const [examType, setExamType] = useState();

	useEffect(() => {
		async function getData() {
			const ifPriceDataNotAvailable = [
				{ class: "5th", price: 0 },
				{ class: "6th", price: 0 },
				{ class: "7th", price: 0 },
				{ class: "8th", price: 0 },
				{ class: "9th", price: 0 },
				{ class: "10th", price: 0 },
			];
			if (selectedYear && examType) {
				const newPriceData = await getPriceData(selectedYear, examType);
				setPriceData(newPriceData || ifPriceDataNotAvailable);
			}
		}
		getData();
	}, [selectedYear, examType]);

	const priceArray = priceData?.map((element, index) => (
		<React.Fragment key={element.class}>
			<Table.Tr>
				<Table.Td>{element.class}</Table.Td>
				<Table.Td
					contentEditable
					onBlur={(e) => handlePriceDataChange(e, index)}>
					{element.price}
				</Table.Td>
			</Table.Tr>
		</React.Fragment>
	));

	function handlePriceDataChange(event, index) {
		const newPriceData = [...priceData];
		newPriceData[index].price = Number(event.target.innerText);
		setPriceData(newPriceData);
	}

	function handleSubmit() {
		if (priceData) {
			setPriceAPI(selectedYear, examType, priceData);
		}
	}

	return (
		<>
			<div>
				<Select
					label='Exam'
					placeholder='Select exam for editing prices'
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

			<>
				<Box
					my='xl'
					component='div'>
					<Table striped>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Class </Table.Th>
								<Table.Th>Price </Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{priceArray}</Table.Tbody>
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

export default PriceEntry;
