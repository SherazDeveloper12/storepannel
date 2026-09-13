import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
const orders = useSelector((state: any) => state.orders.orders)
console.log(orders, 'orders length:', orders?.length);
// ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
const pendingOrders =  orders?.filter((order) => order.status === 'Pending');
const processingOrders = orders?.filter((order) => order.status === 'Processing');
const shippedOrders = orders?.filter((order) => order.status === 'Shipped');
const deliveredOrders = orders?.filter((order) => order.status === 'Delivered');
const cancelledOrders = orders?.filter((order) => order.status === 'Cancelled');
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: any) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const dataset = chart?.data?.datasets?.[0]?.data;
    const totalOrders = Array.isArray(dataset)
      ? dataset.reduce((sum: number, value: unknown) => sum + Number(value || 0), 0)
      : 0;

    const x = (chartArea.left + chartArea.right) / 2;
    const y = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Main value
    ctx.font = '700 28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(totalOrders), x, y - 8);

    // Subtitle
    ctx.font = '500 14px sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('Total Orders', x, y + 18);
    ctx.restore();
  },
};
 const data = {
  labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  datasets: [
    {
      label: '# of Votes',
      data: [pendingOrders?.length || 0, processingOrders?.length || 0, shippedOrders?.length || 0, deliveredOrders?.length || 0, cancelledOrders?.length || 0],
    // {order.status === 'Pending' ? 'bg-yellow-500' : order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'}`
      backgroundColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',

      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 2,
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: '62%',
};
const listdata = [
    {
        title: 'Pending',
        value: pendingOrders?.length || 0,
        color: 'bg-yellow-500'
    },
    {
        title: 'Processing',
        value: processingOrders?.length || 0,
        color: 'bg-blue-500'
    },
    {
        title: 'Shipped',
        value: shippedOrders?.length || 0,
        color: 'bg-purple-500'
    },
    {
        title: 'Delivered',
        value: deliveredOrders?.length || 0,
        color: 'bg-green-500'
    },
    {
        title: 'Cancelled',
        value: cancelledOrders?.length || 0,
        color: 'bg-red-500'
    }

]

  return (
    <div className='flex flex-col gap-4 w-full max-w-80 lg:max-w-none min-w-0'>
        <div className='flex flex-col gap-1'>
            <h2 className='font-semibold'>Order Status</h2>
            <p className='text-sm text-neutral-400'>Distribution of current orders</p>
        </div>
        <div className='w-full h-52 lg:h-60 min-w-0 relative'>
        <Doughnut  options={options} plugins={[centerTextPlugin]} data={data} />
        </div>
        <ul className='flex flex-col gap-2 w-full '>
            {listdata.map((item, index) => (
                <li className='flex justify-start items-center gap-2 ' key={index}>
                    <span className={`w-4 h-4 shrink-0 ${item.color} rounded-full`}></span>
                    <span className='flex-1 flex justify-between items-center gap-2 '>
                        <p>{item.title}</p>
                        <p>{item.value}</p>
                    </span>
                </li>
            ))}
                

        </ul>
    </div>
  )
}
