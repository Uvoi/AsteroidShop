import React, { useState, useEffect, useContext } from 'react';
import './styles.css';
import { Button } from '@mui/material';
import { useTheme } from '../../themes/ThemeProvider';
import ListData, { Order, User } from '../ListData/ListData';


export type Data = 
| { 
    orders: Order[]; 
    total_count: number; 
    } 
| { 
    users: User[]; 
    total_count: number; 
    };


interface PaginationListProps
{
    dataFunc: (start: number, itemsPerPage: number) => Promise<Data>,
    title: string, 
    width: number, 
    link: string,
}

const PaginationList: React.FC<PaginationListProps> = ({ dataFunc, title, width = 100, link }) => {
    const { theme } = useTheme();
    const [data, setData] = useState<Order[] | User[]>([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const parseData = async () => {
            try {
                const start = (currentPage - 1) * itemsPerPage;
                const gettedData = await dataFunc(start, itemsPerPage);
    
                if ('orders' in gettedData) {
                    setData(gettedData.orders); // Если это объект с заказами
                    setTotalData(gettedData.total_count);
                } else if ('users' in gettedData) {
                    setData(gettedData.users); // Если это объект с пользователями
                    setTotalData(gettedData.total_count);
                } else {
                    console.error('Неизвестный формат данных');
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        parseData();
    }, [dataFunc, currentPage]);
    

    const totalPages = Math.ceil(totalData / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='PaginationList'>
            <h1 style={{color:theme.palette.text.ultra}}>{title}</h1>
            {data && data.length > 0 ? (
                <>
                    <ListData data={data} width={width} link={link}/>
                    <div className="pagination">
                        <Button variant='contained' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Назад
                        </Button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                variant='contained'
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </Button>
                        ))}
                        <Button variant='contained' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Далее
                        </Button>
                    </div>
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default PaginationList;
