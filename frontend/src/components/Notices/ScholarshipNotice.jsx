import React from "react";
import {
	Flex,
	Text,
	Table,
	Timeline,
	Textarea,
	Button,
	Center,
} from "@mantine/core";

const ScholarshipNotice = () => {
	const array = [
		{ class: 5, paper: 1 },
		{ class: 5, paper: 2 },
		{ class: 8, paper: 1 },
		{ class: 8, paper: 2 },
	];
	return (
		<Flex
			direction={"column"}
			my={20}>
			<Center mb={20}>
				<h5>Scholarship Exam Previous Year Question Papers</h5>
			</Center>

			<Table striped>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Class</Table.Th>
						<Table.Th>Marathi Medium</Table.Th>
						<Table.Th>English Medium</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					<React.Fragment>
						{array.map((element, index) => (
							<Table.Tr key={index}>
								<Table.Td>
									Class {element.class} (Paper {element.paper})
								</Table.Td>
								<Table.Td>
									<a
										target='_blank'
										href={`./Previous-Year-Papers/Class ${element.class} Schlorship (Paper ${element.paper})-MM.pdf`}>
										Download
									</a>
								</Table.Td>
								<Table.Td>
									<a
										target='_blank'
										href={`./Previous-Year-Papers/Class ${element.class} Schlorship (Paper ${element.paper})-EM.pdf`}>
										Download
									</a>
								</Table.Td>
							</Table.Tr>
						))}
					</React.Fragment>
				</Table.Tbody>
			</Table>
		</Flex>
	);
};

export default ScholarshipNotice;
