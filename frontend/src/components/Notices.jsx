import React from "react";
import { Flex, Text } from "@mantine/core";

const Notices = () => {
	return (
		<div>
			<Flex
				gap='md'
				justify='center'
				align='center  '
				direction='column '
				wrap='nowrap'>
				<img
					src='logo.png'
					alt=''
					height='200px'
					width='200px'
				/>
				<Text>धाराशिव जिल्हा मुख्यध्यापक संघ </Text>
			</Flex>
		</div>
	);
};

export default Notices;
