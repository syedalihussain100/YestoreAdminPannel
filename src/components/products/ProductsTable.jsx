import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteProductAction, ProductListAction } from "../../store/ProductSlice/Product";
import Loading from "../users/Loading";
import ScrollDialog from "../Dialog";
import FullScreenDialog from "../FullDialog";
import Avatar from '@mui/material/Avatar';

const ProductsTable = () => {
	const { loading, appErr, serverErr, product } = useSelector((state) => state.product);
	const { resturant } = useSelector((state) => state.resturant);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ProductListAction({ title: searchTerm }));
	}, [searchTerm, dispatch]);



	const handleSearch = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
	};

	const handleEditClick = (product) => {
		setSelectedProduct(product);
		setOpenEditDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenEditDialog(false);
		setSelectedProduct(null);
	};

	const handleCreateProduct = (e) => {
		e.preventDefault();
		setOpenCreateDialog(true);
	};

	const handleCloseCreateDialog = () => {
		setOpenCreateDialog(false);
	};

	const handleDelete = async (id) => {
		// Show loading state and delete product
		await dispatch(DeleteProductAction(id));
		// Refresh product list after deletion
		dispatch(ProductListAction({ title: searchTerm }));
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
				<button type="button" className="bg-indigo-500" style={{ marginLeft: "100px", padding: "5px", borderRadius: "5px" }} onClick={handleCreateProduct}>Create Product</button>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-48">
					<Loading /> {/* Loading spinner */}
				</div>
			) : (
				<div className='overflow-x-auto'>
					{appErr || serverErr ? (
						<div className="text-red-500">Error: {appErr || serverErr}</div>
					) : (
						<table className='min-w-full divide-y divide-gray-700'>
							<thead>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Image
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Title
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Category
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Price
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Brand
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Description
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>

							<tbody className='divide-y divide-gray-700'>
								{product?.data?.map((product) => (
									<motion.tr
										key={product?._id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
											<Avatar alt="Product Image" src={product?.images[0]} />
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											{product?.title}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											{product?.category}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											${product?.price.toFixed(2)}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											{product?.brand}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											{product?.description}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
											<button
												className='text-indigo-400 hover:text-indigo-300 mr-2'
												onClick={() => handleEditClick(product)}
											>
												<Edit size={18} />
											</button>
											<button className='text-red-400 hover:text-red-300'>
												<Trash2 size={18} onClick={() => handleDelete(product?._id)} />
											</button>
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}

			{selectedProduct && (
				<ScrollDialog
					open={openEditDialog}
					onClose={handleCloseDialog}
					product={selectedProduct}
				/>
			)}

			<FullScreenDialog open={openCreateDialog} onClose={handleCloseCreateDialog} />
		</motion.div>
	);
};

export default ProductsTable;













