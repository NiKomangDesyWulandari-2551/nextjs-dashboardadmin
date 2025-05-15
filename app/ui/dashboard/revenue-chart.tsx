import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lacquer } from '@/app/ui/font'; // Ganti lusitana dengan lacquer untuk tema horor
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue(); // Fetch data weekly sales
  
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);


  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }


  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lacquer.className} mb-4 text-xl md:text-2xl text-orange-500`}>
        Recent Weekly Revenue
      </h2>
      <div className="rounded-xl bg-gray-900 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-black p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>


          {revenue.map((week) => (
            <div key={week.week} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-orange-600"
                style={{
                  height: `${(chartHeight / topLabel) * week.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {week.week}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 4 Weeks</h3>
        </div>
      </div>
    </div>
  );
}
