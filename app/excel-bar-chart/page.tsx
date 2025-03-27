// "use client";
// import { useState } from "react";
// import * as XLSX from "xlsx";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
// } from "recharts";

// type ChartType = "bar" | "line" | "pie";

// export default function ExcelBarChartPage() {
//   const [data, setData] = useState<Record<string, any>[]>([]);
//   const [columns, setColumns] = useState<string[]>([]);
//   const [xKey, setXKey] = useState("");
//   const [yKey, setYKey] = useState("");
//   const [chartType, setChartType] = useState<ChartType>("bar");

//   // Handle file upload and convert Excel data to JSON
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     // Read as ArrayBuffer to avoid type errors
//     reader.readAsArrayBuffer(file);

//     reader.onload = (e) => {
//       const binaryData = e.target?.result as ArrayBuffer;
//       if (!binaryData) return;

//       // XLSX: interpret as array
//       const workbook = XLSX.read(binaryData, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       // Convert to JSON
//       let jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { raw: false });

//       if (jsonData.length === 0) {
//         alert("Excel file is empty or not properly formatted.");
//         return;
//       }

//       // Get columns from first row
//       const availableColumns = Object.keys(jsonData[0]);
//       setColumns(availableColumns);
//       setXKey(availableColumns[0]); // Default X
//       setYKey(availableColumns[1]); // Default Y

//       setData(jsonData);
//     };
//   };

//   // Convert the selected Y column to numeric before rendering charts
//   // (Bar/Line/Pie charts need numeric data)
//   const getChartData = () => {
//     if (!yKey) return data; // If no Y key, just return raw data

//     // Map over data and parse the yKey column as a float
//     return data.map((row) => {
//       const rowCopy = { ...row };
//       const value = parseFloat(rowCopy[yKey]);
//       // If parseFloat is valid, replace the string with a number
//       // Otherwise, set to 0 or handle error
//       rowCopy[yKey] = isNaN(value) ? 0 : value;
//       return rowCopy;
//     });
//   };

//   // Conditionally render the selected chart
//   const renderChart = () => {
//     const chartData = getChartData();

//     if (chartType === "bar") {
//       return (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey={xKey} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey={yKey} fill="#4F46E5" />
//           </BarChart>
//         </ResponsiveContainer>
//       );
//     } else if (chartType === "line") {
//       return (
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey={xKey} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey={yKey} stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       );
//     } else if (chartType === "pie") {
//       // For Pie, treat xKey as the "nameKey" and yKey as numeric "dataKey"
//       return (
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie
//               data={chartData}
//               dataKey={yKey}
//               nameKey={xKey}
//               cx="50%"
//               cy="50%"
//               outerRadius={120}
//               fill="#8884d8"
//               label
//             />
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-md border p-6">
//         <h1 className="text-2xl font-bold mb-4">Excel Data Visualization</h1>
//         <p className="text-gray-600 mb-6">
//           Upload an Excel file to visualize your data in Bar, Line, or Pie charts.
//         </p>

//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           className="mb-4 border p-2 rounded"
//         />

//         {/* Only show dropdowns if columns are available */}
//         {columns.length > 0 && (
//           <div className="flex flex-wrap gap-4 mb-4">
//             {/* X-Axis Selection */}
//             <div>
//               <label className="block text-gray-700">Select X-Axis:</label>
//               <select
//                 value={xKey}
//                 onChange={(e) => setXKey(e.target.value)}
//                 className="border p-2 rounded"
//               >
//                 {columns.map((col) => (
//                   <option key={col} value={col}>
//                     {col}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Y-Axis Selection */}
//             <div>
//               <label className="block text-gray-700">Select Y-Axis:</label>
//               <select
//                 value={yKey}
//                 onChange={(e) => setYKey(e.target.value)}
//                 className="border p-2 rounded"
//               >
//                 {columns.map((col) => (
//                   <option key={col} value={col}>
//                     {col}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Chart Type Selection */}
//             <div>
//               <label className="block text-gray-700">Chart Type:</label>
//               <select
//                 value={chartType}
//                 onChange={(e) => setChartType(e.target.value as ChartType)}
//                 className="border p-2 rounded"
//               >
//                 <option value="bar">Bar</option>
//                 <option value="line">Line</option>
//                 <option value="pie">Pie</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {/* Render Chart if Data Exists */}
//         {data.length > 0 ? (
//           <div className="w-full">{renderChart()}</div>
//         ) : (
//           <p className="text-gray-600">
//             Upload an Excel file to generate a chart.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
} from "recharts";

type ChartType = "bar" | "line" | "pie";

export default function ExcelBarChartPage() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [chartType, setChartType] = useState<ChartType>("bar");

  // Handle file upload and convert Excel data to JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    // Read as ArrayBuffer to avoid type errors
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const binaryData = e.target?.result as ArrayBuffer;
      if (!binaryData) return;

      // XLSX: interpret as array
      const workbook = XLSX.read(binaryData, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert to JSON
      let jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { raw: false });

      if (jsonData.length === 0) {
        alert("Excel file is empty or not properly formatted.");
        return;
      }

      // Get columns from first row
      const availableColumns = Object.keys(jsonData[0]);
      setColumns(availableColumns);
      setXKey(availableColumns[0]); // Default X
      setYKey(availableColumns[1]); // Default Y

      setData(jsonData);
    };
  };

  // Convert the selected Y column to numeric before rendering charts
  // (Bar/Line/Pie charts need numeric data)
  const getChartData = () => {
    if (!yKey) return data; // If no Y key, just return raw data

    // Map over data and parse the yKey column as a float
    return data.map((row) => {
      const rowCopy = { ...row };
      const value = parseFloat(rowCopy[yKey]);
      // If parseFloat is valid, replace the string with a number
      // Otherwise, set to 0 or handle error
      rowCopy[yKey] = isNaN(value) ? 0 : value;
      return rowCopy;
    });
  };

  // Conditionally render the selected chart
  const renderChart = () => {
    const chartData = getChartData();

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "pie") {
      // For Pie, treat xKey as the "nameKey" and yKey as numeric "dataKey"
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey={yKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              // Custom label to show both name and value
              label={(entry) => `${entry[xKey]}: ${entry[yKey]}`}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-md border p-6">
        <h1 className="text-2xl font-bold mb-4">Excel Data Visualization</h1>
        <p className="text-gray-600 mb-6">
          Upload an Excel file to visualize your data in Bar, Line, or Pie charts.
        </p>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4 border p-2 rounded"
        />

        {/* Only show dropdowns if columns are available */}
        {columns.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {/* X-Axis Selection */}
            <div>
              <label className="block text-gray-700">Select X-Axis:</label>
              <select
                value={xKey}
                onChange={(e) => setXKey(e.target.value)}
                className="border p-2 rounded"
              >
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* Y-Axis Selection */}
            <div>
              <label className="block text-gray-700">Select Y-Axis:</label>
              <select
                value={yKey}
                onChange={(e) => setYKey(e.target.value)}
                className="border p-2 rounded"
              >
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* Chart Type Selection */}
            <div>
              <label className="block text-gray-700">Chart Type:</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as ChartType)}
                className="border p-2 rounded"
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
              </select>
            </div>
          </div>
        )}

        {/* Render Chart if Data Exists */}
        {data.length > 0 ? (
          <div className="w-full">{renderChart()}</div>
        ) : (
          <p className="text-gray-600">
            Upload an Excel file to generate a chart.
          </p>
        )}
      </div>
    </div>
  );
}
