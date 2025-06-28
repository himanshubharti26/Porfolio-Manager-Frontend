import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchStocks } from '../../redux/slices/stockSlice';
import styles from './StockList.module.css';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const StockList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const { stocks, isLoading, error } = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    dispatch(fetchStocks({ search: debouncedSearch }));
  }, [dispatch, debouncedSearch]);

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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock: any) => (
              <tr key={stock._id || stock.securityName}>
                <td>{stock.securityName}</td>
                <td>{stock.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockList;
