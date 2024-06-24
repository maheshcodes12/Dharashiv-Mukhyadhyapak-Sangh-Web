import React from "react";
import { IconSchool } from "@tabler/icons-react";
import { Flex, Box, Center, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Header = () => {
	const username = localStorage.getItem("username");
	const Udise = localStorage.getItem("udise");
	return (
		<Box>
			<Flex
				justify='flex-start'
				align='center'
				padding='md'
				direction='row'>
				<Link
					to='/'
					style={{
						textDecoration: "none",
						color: "inherit",
						display: "flex",
						alignItems: "center",
					}}>
					<Flex
						align='center'
						justify='flex-start'>
						<Box m='10'>
							<img
								height='35px'
								width='35px'
								src='logo.png'
								alt=''
							/>
						</Box>
						<Box mr='lg'>
							<Text
								size='md'
								fw='700'
								variant='gradient'
								gradient={{ from: "red", to: "red", deg: 90 }}>
								Dharashiv Mukhyadhyapak Sangh
							</Text>
						</Box>
					</Flex>
				</Link>
				<Box pr='2'>
					{(username || Udise) && (
						<Link
							to='/school'
							style={{
								textDecoration: "none",
								color: "inherit",
								display: "flex",
								alignItems: "center",
							}}>
							{username && <Box mr='xs'>Admin</Box>}
							{Udise && <Box mr='xs'>Udise</Box>}

							<IconSchool />
						</Link>
					)}
					{!Udise && !username && (
						<Link
							to='/register'
							style={{
								textDecoration: "none",
								color: "inherit",
								display: "flex",
								alignItems: "center",
							}}>
							<Box mr='xs'>Register</Box>
							<IconSchool />
						</Link>
					)}
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
