import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProductsPage = ({ data }) => {
  const [companies, setCompanies] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateCompanies = (params) => {
    const filteredCompanies = data.filter((item) => {
      const { companyName } = item;
      if (params.get("name")) {
        return companyName.toLowerCase().includes(params.get("name"));
      }
      return true;
    });
    setCompanies(filteredCompanies);
  };

  useEffect(() => {
    updateCompanies(data)
  })

  // useEffect(() => {
  //   updateCompanies(searchParams);
  // }, [searchParams, data]); 

  const handleChange = (e) => {
    const newName = e.target.value;
    setSearchParams({ name: newName });
  };

  return (
    <>
      <input
        type="text"
        value={searchParams.get("name") || ""}
        onChange={handleChange}
      />
      <ul className="companyList">
        {companies.map(({ id, companyName, companyDescription }) => (
          <li key={id}>
            <h2>{companyName}</h2>
            <p>{companyDescription}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
