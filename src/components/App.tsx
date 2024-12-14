import React, { useEffect, useState } from "react";
import { getAllBrands } from "../api/brandApi.ts";

const App = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await getAllBrands();
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  return (
    <div>
      <h1>Brands</h1>
      <ul>
        {brands.map((brand: any) => (
          <li key={brand.id}>
            {brand.name} - {brand.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
