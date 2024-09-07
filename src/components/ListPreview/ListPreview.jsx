import React, { useContext } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { themeContext } from '../../App';

const ListPreview = ({ title, data, totalCount, col1, col2, col3, col4, link }) => {
    const theme = useContext(themeContext)
    return (
        <div className='ListPreview adminBlock' style={{background: theme.palette.background.paper}}>
            <Link to={link}>
            <h2 style={{color: theme.palette.text.ultra}}>{title} ({totalCount})</h2>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>{col2}</th>
                        <th>{col3}</th>
                        <th>{col4}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user[col1]}>
                            <td>{user[col1]}</td>
                            <td>{user[col2]}</td>
                            <td>{user[col3]}</td>
                            <td>{user[col4]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPreview;
