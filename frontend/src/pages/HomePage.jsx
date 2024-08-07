import React from "react";
import {
	Box,
	Flex,
	AppShell,
	Burger,
	Center,
	Text,
	Divider,
} from "@mantine/core";
import Header from "../components/Header.jsx";
import { useDisclosure } from "@mantine/hooks";
import Profiles from "../components/Profiles.jsx";
import profilesData from "../../profiles.json";
import Navbar from "../components/Navbar.jsx";
import Advisor from "../components/Advisor.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const linkStyle = {
		textAlign: "center",
		textDecoration: "none",
		color: "Red",
		display: "block",
		width: "100%",
	};

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
				<Flex
					gap='md'
					justify='center'
					align='center'
					direction='column'
					wrap='nowrap'
					my='24'>
					<Center>
						<img
							height='150'
							width='150'
							src='logo.png'
							alt='logo'
						/>
					</Center>
					<Center>
						<Text
							fw={900}
							variant='gradient'
							gradient={{ from: "pink", to: "red", deg: 90 }}>
							|| तमसो मा ज्योतिर्गमय ||
						</Text>
					</Center>
					<Center>
						<Text
							size='xl'
							fw={900}
							variant='gradient'
							gradient={{ from: "red", to: "grape", deg: 90 }}>
							धाराशिव जिल्हा मुख्यध्यापक संघ, धाराशिव
						</Text>
					</Center>
				</Flex>
				<Divider
					color='red'
					size='sm'
					my='60'
				/>
				<Center>
					<Link
						to='/notice'
						style={linkStyle}>
						<Text
							size='lg'
							color='red'
							sx={{ textDecoration: "none" }}>
							Class 10th Previous year papers are now ready to download. Click
							Here!
						</Text>
					</Link>
				</Center>

				<Divider
					color='red'
					size='sm'
					my='60'
				/>
				<Flex
					gap='xl'
					justify='center'
					align='center'
					direction='row'
					wrap='wrap'>
					<Box>
						<Center>
							<img
								height='150'
								width='150'
								src='श्री.एम.डी.देशमुख.png'
								alt='श्री.एम.डी.देशमुख'
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
								श्री.एम.डी.देशमुख
							</Text>
							<Text
								size='sm'
								color='red'>
								मानद अध्यक्ष
							</Text>
							<Text size='sm'>9422934297</Text>
							<Text
								size='xs'
								color='cyan'>
								छ.शि.हा.धराशिव (मा.मु.अ.)
							</Text>
						</Flex>
					</Box>
				</Flex>

				<Divider
					color='red'
					size='sm'
					my='60'
					label={
						<Text
							color='blue'
							fw='bold'>
							सल्लागार समिति{" "}
						</Text>
					}
					labelPosition='center'
				/>
				<Flex
					gap='xl'
					justify='center'
					align='center'
					direction='row'
					wrap='wrap'>
					{profilesData.map(
						(element, index) =>
							index > 0 &&
							index < 6 && (
								<Advisor
									key={index}
									name={element.name}
									phoneNo={element.phoneNo}
									school={element.school}
								/>
							)
					)}
				</Flex>
				<Divider
					color='red'
					size='sm'
					my='60'
				/>

				<Flex
					mt='46'
					mx='20'
					gap='md'
					justify='space-around'
					align='center'
					direction='row'
					wrap='wrap'>
					{profilesData.map(
						(element, index) =>
							index <= 7 &&
							index >= 6 && (
								<Profiles
									key={index}
									name={element.name}
									position={element.position}
									phoneNo={element.phoneNo}
									school={element.school}
								/>
							)
					)}
				</Flex>
				<Divider
					color='red'
					size='sm'
					my='60'
					label={
						<Text
							color='blue'
							fw='bold'>
							कार्यकरणी{" "}
						</Text>
					}
					labelPosition='center'
				/>
				<Flex
					mt='46'
					mx='20'
					gap='md'
					justify='center'
					align='center'
					direction='column'
					wrap='nowrap'>
					<Flex
						gap='md'
						justify='space-around'
						align='center'
						direction='row'
						wrap='wrap'>
						{profilesData.map(
							(element, index) =>
								index > 7 && (
									<Profiles
										key={index}
										name={element.name}
										position={element.position}
										phoneNo={element.phoneNo}
										school={element.school}
									/>
								)
						)}
					</Flex>
				</Flex>
			</AppShell.Main>
		</AppShell>
	);
};

export default HomePage;
