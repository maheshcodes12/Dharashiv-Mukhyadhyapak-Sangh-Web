import React from "react";
import { Box, Flex, AppShell, Burger } from "@mantine/core";
import Header from "../components/Header.jsx";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [opened, { toggle }] = useDisclosure(false); // Initialize opened as false
	const a = localStorage.getItem("username");

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding='md'>
			<AppShell.Header>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom='sm'
					size='sm'
				/>
				<Header />
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<Link to='/register'>Register/Login for School</Link>
				<Link to='/admin'>Register/Login for Admin</Link>
				<Link to='/notice'>Noticeboard</Link>
				<Link to='/entry'>Add data</Link>
				{a && (
					<>
						<Link to='/admindata'>Schools Data</Link>
						<Link to='/adminentry'>Edit prices or timetable</Link>
					</>
				)}
			</AppShell.Navbar>

			<AppShell.Main></AppShell.Main>
		</AppShell>
	);
};

export default HomePage;
