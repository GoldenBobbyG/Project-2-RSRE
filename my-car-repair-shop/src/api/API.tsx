// import React, { useState, useEffect } from 'react';

// interface CarModel {
//   id: number;
//   name: string;
// }

// const CarModelsComponent: React.FC = () => {
//   const [carModels, setCarModels] = useState<CarModel[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCarModels = async () => {
//       try {
//         const response = await fetch('https://carapi.app/api/make-models');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setCarModels(data);
//       } catch (error) {
//         //setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarModels();
//   }, []); // Empty dependency array ensures this effect runs once after the initial render

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Car Models</h2>
//       <ul>
//         {carModels.map((model) => (
//           <li key={model.id}>{model.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CarModelsComponent;
