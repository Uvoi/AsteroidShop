import React from 'react';
import './styles.css';
import { useTheme } from '../../../themes/ThemeProvider';

export type Statistics = {
    'Суммарно заработано': string,
    'Продуктов в доставке': number,
    'Доставленных продуктов': number,
    'Всего пользователей': number,
    'Всего заказов': number,
  }

interface StatisticsBlockProps
{
    data:Statistics,
    title: string,
}

const StatisticsBlock: React.FC<StatisticsBlockProps> = ({ data, title }) => {
    const { theme } = useTheme();

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