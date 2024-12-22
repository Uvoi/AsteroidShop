import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../themes/ThemeProvider';
import { ListDataItem } from '../ListData/ListData';

interface ListPreviewProps<T extends ListDataItem> {
    title: string;
    data: T[];
    totalCount: number;
    col1: keyof T;
    col2: keyof T;
    col3: keyof T;
    col4: keyof T;
    link: string;
}

const ListPreview = <T extends ListDataItem>({
    title,
    data,
    totalCount,
    col1,
    col2,
    col3,
    col4,
    link,
}: ListPreviewProps<T>) => {
    const { theme } = useTheme();

    return (
        <div className="ListPreview adminBlock" style={{ background: theme.palette.background.paper }}>
            <Link to={link}>
                <h2 style={{ color: theme.palette.text.ultra }}>
                    {title} ({totalCount})
                </h2>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>{String(col1)}</th>
                        <th>{String(col2)}</th>
                        <th>{String(col3)}</th>
                        <th>{String(col4)}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{String(item[col1])}</td>
                            <td>{String(item[col2])}</td>
                            <td>{String(item[col3])}</td>
                            <td>{String(item[col4])}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPreview;
