import { AppShell, Burger, Box } from "@mantine/core";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import Header from "../components/Header";
import { Tabs, rem } from "@mantine/core";
import PriceEntry from "../components/PriceEntry";
import TimetableEntry from "../components/TimetableEntry";

import { getPriceData, setPriceAPI } from "../services/priceAPI";
import Navbar from "../components/Navbar";

const AdminEntry = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const [priceData, setPriceData] = useState([]);
	const [selectedYear, setSelectedYear] = useState();
	const [examType, setExamType] = useState();

	useEffect(() => {
		async function getData() {
			if (selectedYear && examType) {
				const newPriceData = await getPriceData(selectedYear, examType);
				setPriceData(newPriceData || []);
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
				<Navbar />
			</AppShell.Navbar>

			<AppShell.Main>
				<Tabs defaultValue='price'>
					<Tabs.List mb='20'>
						<Tabs.Tab value='price'>Edit Prices</Tabs.Tab>
						<Tabs.Tab value='timetable'>Edit Timetable</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='price'>
						<PriceEntry />
					</Tabs.Panel>

					<Tabs.Panel value='timetable'>
						<TimetableEntry />
					</Tabs.Panel>
				</Tabs>
			</AppShell.Main>
		</AppShell>
	);
};

export default AdminEntry;
