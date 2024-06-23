import React from "react";
import { IconSchool } from "@tabler/icons-react";
import { Flex, Box } from "@mantine/core";
import { Link } from "react-router-dom";

const Header = () => {
	const username = localStorage.getItem("username");
	const Udise = localStorage.getItem("udise");
	return (
		<Box sx={{ width: "100%", height: 60 }}>
			<Flex
				mt='15'
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
						<Box mr='sm'>
							<img
								height='35px'
								width='35px'
								src='logo.png'
								alt=''
							/>
						</Box>
						<Box>Dharashiv Mukhysdhyapak Sangh</Box>
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
