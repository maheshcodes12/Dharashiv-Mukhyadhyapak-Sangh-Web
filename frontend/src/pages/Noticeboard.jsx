import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { Tabs, rem } from "@mantine/core";
import { IconTable, IconInfoSquare } from "@tabler/icons-react";
import Notices from "../components/Notices";
import Timetable from "../components/Timetable";
import Header from "../components/Header";
import { useEffect } from "react";

export default function Noticeboard() {
	const [opened, { toggle }] = useDisclosure();
	const iconStyle = { width: rem(12), height: rem(12) };

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("udise");
		if (!isLoggedIn) {
			window.location.href = `${import.meta.env.VITE_FRONTEND_URI}/register`;
		}
	}, []);

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
				<Header></Header>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<Link to='/notice'>Noticeboard</Link>
				<Link to='/entry'>Add data</Link>
			</AppShell.Navbar>

			<AppShell.Main>
				<Tabs defaultValue='notifications'>
					<Tabs.List mb='20'>
						<Tabs.Tab
							value='notifications'
							leftSection={<IconInfoSquare style={iconStyle} />}>
							Notifications
						</Tabs.Tab>
						<Tabs.Tab
							value='timetable'
							leftSection={<IconTable style={iconStyle} />}>
							Timetable
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='notifications'>
						<Notices />
					</Tabs.Panel>

					<Tabs.Panel value='timetable'>
						<Timetable />
					</Tabs.Panel>
				</Tabs>
			</AppShell.Main>
		</AppShell>
	);
}
