import React from "react";
import { Box, Text, Center, Flex } from "@mantine/core";

const Advisor = ({ name, school, phoneNo }) => {
	return (
		<Box>
			<Center>
				<img
					height='150'
					width='150'
					src={`${name}.png`}
					alt={`${name}`}
					onError={(e) => {
						e.target.src = "profile.png";
					}}
				/>
			</Center>

			<Flex
				gap='2'
				justify='center'
				align='center'
				direction='column'
				wrap='nowrap'>
				<Text
					mt='8'
					fw='bold'
					color='green'>
					{`${name}`}
				</Text>
				<Text
					size='sm'
					color='red'>
					सल्लागार
				</Text>
				<Text size='sm'>{`${phoneNo}`}</Text>
				<Text
					size='xs'
					color='cyan'>
					{`${school}`}
				</Text>
			</Flex>
		</Box>
	);
};

export default Advisor;
