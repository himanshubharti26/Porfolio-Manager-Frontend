import React, { useState } from 'react';
import styles from './StockList.module.css';

// Mock stock data
type Stock = {
  name: string;
  value: number;
};

const mockStocks: Stock[] = [
  { name: 'Apple', value: 195 },
  { name: 'Microsoft', value: 340 },
  { name: 'Tesla', value: 250 },
  { name: 'Amazon', value: 130 },
  { name: 'Google', value: 2800 },
];

const StockList: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(search.toLowerCase()) ||
      stock.value.toString().includes(search)
  );

  return (
    <div className={styles.container}>
      <h2>Stock List</h2>
      <input
        type="text"
        placeholder="Search by name or value..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.name}>
              <td>{stock.name}</td>
              <td>{stock.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
