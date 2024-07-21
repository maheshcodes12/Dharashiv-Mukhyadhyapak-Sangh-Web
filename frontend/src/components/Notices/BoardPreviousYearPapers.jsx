import React, { useMemo, useState } from "react";
import {
	Flex,
	Text,
	Table,
	Timeline,
	Textarea,
	Button,
	Center,
} from "@mantine/core";
import { setNewNotice } from "../../services/newNoticeApi";

const BoardPreviousYearPapers = () => {
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

	const paperRows = useMemo(() => {
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
						<Table.Td>
							<a
								href={`./Previous-Year-Papers/${element}-EM.pdf`}
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

	return (
		<Flex
			my={20}
			justify='center'
			wrap='wrap'>
			<Center>
				<h5>2024 मार्च 10वी बोर्ड प्रश्नपत्रिका</h5>
			</Center>
			<Table
				striped
				border={"seperate"}>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Subject</Table.Th>
						<Table.Th>Marathi Medium</Table.Th>
						<Table.Th>English Medium</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{paperRows}</Table.Tbody>
			</Table>
		</Flex>
	);
};

export default BoardPreviousYearPapers;
