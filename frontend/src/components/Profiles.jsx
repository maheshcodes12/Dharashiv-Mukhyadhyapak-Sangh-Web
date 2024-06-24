import React from "react";
import { Box, Flex, Text, Center } from "@mantine/core";

const Profiles = ({ name, position, school, phoneNo }) => {
	return (
		<Box
			style={{
				border: "2px solid pink",
				borderRadius: "2em",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				padding: "2em",
			}}>
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
					{name}
				</Text>
				<Text
					size='sm'
					color='red'>
					{position}
				</Text>
				<Text size='sm'>{phoneNo}</Text>
				<Text
					size='xs'
					color='cyan'>
					{school}
				</Text>
			</Flex>
		</Box>
	);
};

export default Profiles;
