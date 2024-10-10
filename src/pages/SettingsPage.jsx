import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";

const SettingsPage = () => {
	const { userAuth } = useSelector((state) => state?.auth);

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile userData={userAuth} />
				<Notifications />
				<Security />
				<DangerZone />
			</main>
		</div>
	);
};
export default SettingsPage;
