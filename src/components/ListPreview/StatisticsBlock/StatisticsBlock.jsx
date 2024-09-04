import React, { useContext } from 'react';
import './styles.css';
import { themeContext } from '../../../App';

const StatisticsBlock = ({ data, title }) => {
    const theme = useContext(themeContext);

    return (
        <div className="StatisticsBlock adminBlock" style={{ background: theme.palette.background.paper }}>
            <h2 style={{ color: theme.palette.text.ultra }}>{title}</h2>
            <table>
                <tbody>
                    {Object.entries(data).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticsBlock;