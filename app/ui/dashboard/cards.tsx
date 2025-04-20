type CardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export default function Card({ title, value, icon }: CardProps) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-md text-white w-64">
      <div className="flex items-center space-x-3">
        {icon}
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
