import { Box, Flex } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
	const a = localStorage.getItem("username");
	const b = localStorage.getItem("udise");
	const linkStyle = {
		textAlign: "center",
		textDecoration: "none",
		borderBottom: "1px solid pink",
		color: "Red",
		paddingBottom: "1em",
		display: "block",
		width: "100%",
	};
	return (
		<Box>
			<Flex
				mt='100'
				gap='xl'
				justify='center'
				align='center'
				direction='column'
				wrap='wrap'>
				<Link
					to='/'
					style={linkStyle}>
					Home
				</Link>
				<Link
					to='/register'
					style={linkStyle}>
					Register/Login for School
				</Link>
				<Link
					to='/admin'
					style={linkStyle}>
					Register/Login for Admin
				</Link>
				<Link
					to='/notice'
					style={linkStyle}>
					Noticeboard
				</Link>
				{b && (
					<Link
						to='/entry'
						style={linkStyle}>
						Add data
					</Link>
				)}
				{a && (
					<>
						<Link
							to='/admindata'
							style={linkStyle}>
							Schools Data
						</Link>
						<Link
							to='/adminentry'
							style={linkStyle}>
							Edit prices or timetable
						</Link>
						<Link
							to='/download'
							style={linkStyle}>
							Download Taluka Wise Data
						</Link>
					</>
				)}
			</Flex>
		</Box>
	);
};

export default Navbar;
