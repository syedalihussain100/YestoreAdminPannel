import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction, DeleteUserAction, UpdateRoleAction } from "../../store/AuthSlice/Auth";
import Loading from "../users/Loading";

const UsersTable = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserAction());
	}, [dispatch]);

	const users = useSelector((state) => state?.auth?.users);
	const { loading, appErr, serverErr } = useSelector((state) => state?.auth);

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [editingUserId, setEditingUserId] = useState(null);
	const [editedRole, setEditedRole] = useState("");

	// Update filteredUsers whenever users data changes or search term changes
	useEffect(() => {
		if (users && users?.length > 0) {
			const filtered = users.filter((u) =>
				u?.name?.toLowerCase().includes(searchTerm) ||
				u?.email?.toLowerCase().includes(searchTerm)
			);
			setFilteredUsers(filtered);
		}
	}, [users, searchTerm]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const handleDelete = async (id) => {
		await dispatch(DeleteUserAction(id));

		dispatch(getUserAction())
	}

	const handleEditClick = (user) => {
		setEditingUserId(user._id); 
		setEditedRole(user.role); 
	};

	const handleRoleChange = (e) => {
		setEditedRole(e.target.value);
	};

	const handleUpdate = async (id) => {
		await dispatch(UpdateRoleAction({ id, role: editedRole }));
		dispatch(getUserAction()); 
		setEditingUserId(null); 
	};

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Users</h2>
				<div className="relative">
					<input
						type="text"
						placeholder="Search users..."
						className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
				</div>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-48">
					<Loading /> {/* Loading spinner */}
				</div>
			) : (
				<div className="overflow-x-auto">
					{appErr || serverErr ? (
						<div className="text-red-500">Error: {appErr || serverErr}</div>
					) : (
						<table className="min-w-full divide-y divide-gray-700">
							<thead>
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Role
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Address
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Number
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-gray-700">
								{filteredUsers?.map((user) => (
									<motion.tr
										key={user?._id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
														{user?.image ? (
															<img
																src={user?.image}
																alt={user?.name}
																className="h-full w-full rounded-full object-cover"
															/>
														) : (
															<span>{user?.name?.charAt(0)}</span>
														)}
													</div>
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-100">
														{user?.name}
													</div>
												</div>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-300">{user?.email}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{editingUserId === user._id ? (
												<select
													value={editedRole}
													onChange={handleRoleChange}
													className="bg-gray-700 text-white px-2 py-1 rounded"
												>
													<option value="admin">Admin</option>
													<option value="user">User</option>
												</select>
											) : (
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
													{user?.role}
												</span>
											)}
										</td>

										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
												{user?.address}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
												{user?.number}
											</span>
										</td>

										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
											{editingUserId === user._id ? (
												<button
													onClick={() => handleUpdate(user._id)}
													className="text-green-400 hover:text-green-300 mr-2"
												>
													Update
												</button>
											) : (
												<button
													onClick={() => handleEditClick(user)}
													className="text-indigo-400 hover:text-indigo-300 mr-2"
												>
													Edit
												</button>
											)}
											<button
												onClick={() => handleDelete(user?._id)}
												className="text-red-400 hover:text-red-300"
											>
												Delete
											</button>
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}
		</motion.div>
	);
};

export default UsersTable;
