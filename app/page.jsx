"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    document.title = "2237882"; // Setting the website title to Roll Number
  }, []);

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Must contain 'data' as an array.");
      }

      const res = await fetch("https://dev-challenge-naman.vercel.app/api/be_challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
        mode: "cors",
      });

      if (!res.ok) throw new Error("Failed to fetch response from server");
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = (e) => {
    const options = [...e.target.options]
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedFilters(options);
  };

  const filteredResponse = () => {
    if (!response) return null;
    let filteredData = {};
    
    if (selectedFilters.includes("Alphabets")) {
      filteredData["alphabets"] = response.alphabets;
    }
    if (selectedFilters.includes("Numbers")) {
      filteredData["numbers"] = response.numbers;
    }
    if (selectedFilters.includes("Highest Alphabet")) {
      filteredData["highest_alphabet"] = response.highest_alphabet;
    }
    return filteredData;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">2237882</h1>
      <label className="font-semibold mb-2">API Input:</label>
      <textarea
        className="w-full max-w-lg p-3 border rounded-lg shadow-sm"
        rows="5"
        placeholder='Enter JSON: { "data": ["A", "C", "z"] }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      
      {response && (
        <div className="mt-6 p-4 w-full max-w-lg bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Response</h2>
          <div className="mt-3">
            <label className="font-semibold">Filter Data:</label>
            <select
              multiple
              className="w-full border p-2 rounded mt-2"
              onChange={handleFilterChange}
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Alphabet">Highest Alphabet</option>
            </select>
          </div>
          <pre className="mt-4 bg-gray-100 p-3 rounded">{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
