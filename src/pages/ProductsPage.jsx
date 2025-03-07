import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import ProductsTable from "../components/products/ProductsTable";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ProductListAction } from "../store/ProductSlice/Product";


const ProductsPage = () => {
	const dispatch = useDispatch();
	const Productstore = useSelector(state => state?.product);
	useEffect(() => {
		dispatch(ProductListAction());
	}, [dispatch])
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={Productstore?.product?.data?.length} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
				</motion.div>

				<ProductsTable product={Productstore} />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<CategoryDistributionChart product={Productstore}/>
				</div>
			</main>
		</div>
	);
};
export default ProductsPage;
