import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export type Order = {
  orderid: number;
  customerid: number;
  totalprice: number;
  deliveryaddress: string;
  deliverydate: string;
  orderdate: string;
  productids: number[];
  status: string;
}

export type User = {
  customerid: number;
  firstname: string;
  lastname: string;
  email: string;
  is_admin: boolean;
  photo: string;
}

export type ListDataItem = Order | User;

interface ListDataProps {
  data: ListDataItem[];
  width: number;
  link: string;
}

const ListData: React.FC<ListDataProps> = ({ data, width, link }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  const getUserAdminClass = (isAdmin: boolean) => {
    return isAdmin ? 'admin-yes' : '';
  };

  const getOrderStatusClass = (status: string) => {
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

  const getId = (item: ListDataItem) => {
    return item.customerid;
  };

  return (
    <table className='ListData' border={1} width={width + '%'}>
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
              const cellContent = (() => {
                if ('is_admin' in item && column === 'is_admin') {
                  return (
                    <div className={getUserAdminClass(item.is_admin)}>
                      {item.is_admin ? 'Yes' : 'No'}
                    </div>
                  );
                }
                if ('status' in item && column === 'status') {
                  return (
                    <div className={getOrderStatusClass(item.status)}>
                      {item.status}
                    </div>
                  );
                }
                if (column === 'photo' && 'photo' in item) {
                  return <img src={item.photo} alt="User" />;
                }
                return item[column as keyof ListDataItem] ?? 'N/A';
              })();

              return (
                <td key={`${index}-${column}`}>
                  {link ? (
                    <Link to={link + getId(item)}>{cellContent}</Link>
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
