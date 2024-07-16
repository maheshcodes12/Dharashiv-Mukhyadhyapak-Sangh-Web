import React, { useState } from "react";
import {
	NativeSelect,
	Box,
	Button,
	Flex,
	AppShell,
	Burger,
	Center,
	Text,
	Divider,
	Select,
} from "@mantine/core";
import Header from "../components/Header.jsx";
import { useDisclosure } from "@mantine/hooks";
import downloadPDF from "../utils/downloadPDF.js";
import Navbar from "../components/Navbar.jsx";

const DownloadPDF = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const [selectedExam, setSelectedExam] = useState();
	const [selectedYear, setSelectedYear] = useState();
	const [selectedTaluka, setSelectedTaluka] = useState("Dharashiv");

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
				<Flex
					gap='md'
					justify='center'
					align='center'
					direction='column'
					wrap='nowrap'>
					<Center>
						<Select
							label='Select Exam Name'
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
								setSelectedExam(value);
							}}
							searchable
						/>
					</Center>
					<Center>
						<Select
							label='Select Exam Year'
							placeholder='Select Academic Year'
							data={["2024-25", "2025-26", "2026-27", "2027-28", "2028-29"]}
							onChange={(value) => {
								setSelectedYear(value);
							}}
							searchable
						/>
					</Center>
					<Center>
						<NativeSelect
							label='Select Taluka'
							withAsterisk
							value={selectedTaluka}
							defaultValue={"Dharashiv"}
							onChange={(event) => {
								setSelectedTaluka(event.currentTarget.value);
							}}
							data={[
								"Dharashiv",
								"Tuljapur",
								"Omerga",
								"Lohara",
								"Kallamb",
								"Bhoom",
								"Paranda",
								"Washi",
							]}
						/>
					</Center>
					{selectedExam && selectedYear && selectedTaluka && (
						<Center my='30'>
							<Button
								onClick={() =>
									downloadPDF(selectedTaluka, selectedExam, selectedYear)
								}>
								Download
							</Button>
						</Center>
					)}
				</Flex>
			</AppShell.Main>
		</AppShell>
	);
};

export default DownloadPDF;
