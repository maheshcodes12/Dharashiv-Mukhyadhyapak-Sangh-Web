import React, { useMemo } from "react";
import { Flex, Text, Table, Timeline, colorsTuple } from "@mantine/core";

const Notices = () => {
	const subjects = [
		"Marathi",
		"Hindi",
		"English",
		"Algebra",
		"Geometry",
		"Science Part 1",
		"Science Part 2",
		"History",
		"Geography",
		"Sanskrit",
	];
	const marathiMediumPaperRows = useMemo(() => {
		return (
			<React.Fragment>
				{subjects.map((element, index) => (
					<Table.Tr key={index}>
						<Table.Td>{element}</Table.Td>
						<Table.Td>
							<a
								href={`./Previous-Year-Papers/${element}-MM.pdf`}
								target='_blank'
								// download={`${element} Marathi Medium.pdf`}
							>
								Download
							</a>
						</Table.Td>
					</Table.Tr>
				))}
			</React.Fragment>
		);
	}, []);
	const englishMediumPaperRows = useMemo(() => {
		return (
			<React.Fragment>
				{subjects.map((element, index) => (
					<Table.Tr key={index}>
						<Table.Td>{element}</Table.Td>
						<Table.Td>
							<a
								href={`./Previous-Year-Papers/${element}-EM.pdf`}
								target='_blank'
								// download={`${element} English Medium.pdf`}
							>
								Download
							</a>
						</Table.Td>
					</Table.Tr>
				))}
			</React.Fragment>
		);
	}, []);

	return (
		<Flex
			gap='md'
			justify='center'
			align='center'
			direction='column'
			wrap='wrap'
			p='lg'>
			<Timeline
				color='pink'
				active={0}
				lineWidth={1}
				bulletSize={18}>
				<Timeline.Item title='20-7-2024'>
					<Flex
						gap={100}
						justify='center'
						align='center'
						wrap='wrap'>
						<div>
							<Text py={12}>
								मराठी माध्यम 2024 मार्च 10वी बोर्ड प्रश्नपत्रिका
							</Text>
							<Table striped>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Subject</Table.Th>
										<Table.Th>Link</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{marathiMediumPaperRows}</Table.Tbody>
							</Table>
						</div>
						<div>
							<Text py={12}>English Medium 2024 March 10th Board Papers</Text>
							<Table striped>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Subject</Table.Th>
										<Table.Th>Link</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{englishMediumPaperRows}</Table.Tbody>
							</Table>
						</div>
					</Flex>
				</Timeline.Item>
				<Timeline.Item title='20-7-2024'></Timeline.Item>
			</Timeline>
		</Flex>
	);
};

export default Notices;
