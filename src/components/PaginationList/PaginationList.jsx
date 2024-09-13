import React, { useState, useEffect, useContext } from 'react';
import './styles.css';
import ListData from '../ListData/ListData';
import { Button } from '@mui/material';
import { themeContext } from '../../App';

const PaginationList = ({ dataFunc, title, width = 100, link }) => {
    const theme = useContext(themeContext)
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const parseData = async () => {
            try {
                const start = (currentPage - 1) * itemsPerPage;
                const gettedData = await dataFunc(start, itemsPerPage);
                if (gettedData) {
                    const keys = Object.keys(gettedData);
                    if (keys.length >= 2) {
                        const dataKey = keys[0];
                        const totalKey = keys[1];

                        setData(gettedData[dataKey]);
                        setTotalData(gettedData[totalKey]);
                    }
                } else {
                    console.error('Ошибка при получении данных');
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        parseData();
    }, [dataFunc, currentPage]);

    const totalPages = Math.ceil(totalData / itemsPerPage);

    const handlePageChange = (page) => {
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
