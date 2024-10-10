import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useNavigate } from "react-router-dom";


const Profile = ({ userData }) => {
	const navigate = useNavigate();
	console.log("navigate", navigate)
	const handleLogout = (e) => {
		e.preventDefault()
		localStorage.removeItem('userInfo');
		window.location.reload();
	}


	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src={userData?.image}
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>{userData?.name}</h3>
					<p className='text-gray-400'>{userData?.email}</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto' onClick={handleLogout}>
				Logout
			</button>
		</SettingSection>
	);
};
export default Profile;
