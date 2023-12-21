import React, { useMemo } from 'react';
import { MEASURE, calculateClassStatistics } from './utils';
import { ClassStatisticsTableProps } from './interface';
import './style.css'
const ClassStatisticsTable: React.FC<ClassStatisticsTableProps> = ({ dataset, property, measure }) => {
    const result = useMemo(() => calculateClassStatistics(dataset, property, measure), [
        dataset,
        property,
        measure,
    ]);

    if (!result) {
        return null;
    }

    const classNames = Object.keys(result); // Reverse the order of class names

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {classNames.map((className) => (
                            <th key={className}>{className}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {classNames.map((className, i) => (
                        <tr key={className}>
                            <td>{`${property} ${MEASURE[i]}`}</td>
                            <td>{result[className].Mean.toFixed(3)}</td>
                            <td>{result[className].Median.toFixed(3)}</td>
                            <td>{result[className].Mode.toFixed(3)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassStatisticsTable;
