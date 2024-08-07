import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Noticeboard from "./pages/Noticeboard";
import Register from "./pages/Register";
import AddData from "./pages/AddData";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
import "@mantine/notifications/styles.css";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import AdminRegister from "./pages/AdminRegister";
import AdminData from "./pages/AdminData";
import AdminEntry from "./pages/AdminEntry";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import DownloadPDF from "./pages/DownloadPDF";

export default function App() {
	return (
		<MantineProvider theme={theme}>
			<Notifications limit={1} />
			<Router>
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/notice'
						element={<Noticeboard />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/admin'
						element={<AdminRegister />}
					/>
					<Route
						path='/entry'
						element={<AddData />}
					/>
					<Route
						path='/school'
						element={<Profile />}
					/>
					<Route
						path='/admindata'
						element={<AdminData />}
					/>
					<Route
						path='/adminentry'
						element={<AdminEntry />}
					/>
					<Route
						path='/download'
						element={<DownloadPDF />}
					/>
					<Route
						path='/resetpassword'
						element={<ResetPassword />}
					/>
					<Route
						path='/*'
						element={<NotFound />}
					/>
				</Routes>
			</Router>
		</MantineProvider>
	);
}
