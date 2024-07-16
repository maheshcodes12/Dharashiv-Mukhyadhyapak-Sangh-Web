import { AppShell, Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Tabs, rem } from "@mantine/core";
import { IconTable, IconInfoSquare } from "@tabler/icons-react";
import Notices from "../components/Notices";
import Timetable from "../components/Timetable";
import Header from "../components/Header";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Noticeboard() {
	const [opened, { toggle }] = useDisclosure();
	const iconStyle = { width: rem(12), height: rem(12) };

	useEffect(() => {
		const isLoggedIn =
			localStorage.getItem("udise") || localStorage.getItem("username");
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
				<Flex
					gap='md'
					justify='flex-start'
					align='flex-start'
					direction='row'
					wrap='nowrap'>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom='sm'
						size='sm'
						px='20'
						py='35'
					/>

					<Header sx={{ alignSelf: "flex-start" }} />
				</Flex>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<Navbar />
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
