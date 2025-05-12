"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Home() {
  const [msciWeight, setMsciWeight] = useState(70);
  const [sparrate, setSparrate] = useState(150);
  const [laufzeit, setLaufzeit] = useState(10);

  const emWeight = 100 - msciWeight;
  const rendite = (0.06 * msciWeight + 0.10 * emWeight) / 100;

  const data = Array.from({ length: laufzeit + 1 }, (_, i) => {
    const gesamt = Array.from({ length: i }, (_, j) =>
      sparrate * 12 * Math.pow(1 + rendite, i - j)
    ).reduce((a, b) => a + b, 0);

    return {
      year: new Date().getFullYear() + i,
      value: Math.round(gesamt),
    };
  });

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>ETF Sparplan Rechner</h1>

      <div>
        <label>MSCI World Gewichtung: {msciWeight}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={msciWeight}
          onChange={(e) => setMsciWeight(Number(e.target.value))}
        />
        <p>Emerging Markets: {emWeight}%</p>
      </div>

      <div>
        <label>Monatliche Sparrate (€)</label>
        <input
          type="number"
          value={sparrate}
          onChange={(e) => setSparrate(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Laufzeit (Jahre)</label>
        <input
          type="number"
          value={laufzeit}
          onChange={(e) => setLaufzeit(Number(e.target.value))}
        />
      </div>

      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toLocaleString()} €`} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </main>
  );
}
