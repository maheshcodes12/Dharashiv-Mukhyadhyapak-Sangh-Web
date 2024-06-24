import React from "react";
import { IconSchool } from "@tabler/icons-react";
import { Flex, Box, Center, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Header = () => {
	const username = localStorage.getItem("username");
	const Udise = localStorage.getItem("udise");
	return (
		<Box sx={{ width: "100%", height: 60 }}>
			<Flex
				mih='60'
				px='30'
				justify='space-between'
				align='center'
				padding='md'>
				<Link
					to='/'
					style={{
						textDecoration: "none",
						color: "inherit",
						display: "flex",
						alignItems: "center",
					}}>
					<Flex align='center'>
						<Box mx='xl'>
							<img
								height='35px'
								width='35px'
								src='logo.png'
								alt=''
							/>
						</Box>
						<Box mr='lg'>
							<Text
								size='xl'
								fw='700'
								variant='gradient'
								gradient={{ from: "red", to: "red", deg: 90 }}>
								Dharashiv Mukhyadhyapak Sangh
							</Text>
						</Box>
					</Flex>
				</Link>

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
			</Flex>
		</Box>
	);
};

export default Header;
