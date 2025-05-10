"use client";

import { useEffect, useState } from "react";
import { getPing } from "../../../api/ping";

export default function LogSection() {
  const [pingResult, setPingResult] = useState("");

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await getPing();
        setPingResult(JSON.stringify(response, null, 2));
      } catch (error) {
        setPingResult("Error: " + (error as Error).message);
      }
    };

    fetchPing();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Log</h1>
      <pre className="bg-gray-100 p-4 rounded-lg">
        {pingResult || "Loading..."}
      </pre>
    </div>
  );
}
