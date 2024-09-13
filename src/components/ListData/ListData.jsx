import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const ListData = ({ data, width, link }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  const isUsers = columns.includes('is_admin');
  const isOrders = columns.includes('status');

  const getUserAdminClass = (isAdmin) => {
    return isAdmin ? 'admin-yes' : '';
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'In Transit':
        return 'status-in-transit';
      case 'Cancelled':
        return 'status-cancelled';
      case 'Error':
        return 'status-error';
      case 'Deleted':
        return 'status-deleted';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const getId = (item) =>
  {
    if (isUsers)
    {
      return item.customerid;
    }
    else if (isOrders)
    {
      return item.customerid;
    }
    return '';
  };

  return (
    <table className='ListData' border="1" width={width + '%'}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => {
              const cellContent = (
                <div
                  className={
                    isUsers && column === 'is_admin'
                      ? getUserAdminClass(item[column])
                      : isOrders && column === 'status'
                      ? getOrderStatusClass(item[column])
                      : ''
                  }
                >
                  {column === 'photo' && item[column] ? (
                    <img src={item[column]} alt="User" />
                  ) : typeof item[column] === 'boolean' ? (
                    item[column] ? 'Yes' : 'No'
                  ) : (
                    item[column] !== null && item[column] !== undefined
                      ? item[column]
                      : 'N/A'
                  )}
                </div>
              );
              
              return (
                <td key={`${index}-${column}`}>
                  {link ? (
                    <Link to={link + getId(item)}>
                      {cellContent}
                    </Link>
                  ) : (
                    cellContent
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListData;
