import { DatasetEntry } from "../../interface";

interface ClassStatistics {
    [className: string]: { Mean: number; Median: number; Mode: number };
}

export const MEASURE = [" Mean", ' Median', ' Mode']

export const calculateClassStatistics = (
    dataset: DatasetEntry[],
    property: string,
    measure: string
): ClassStatistics => {
    const calculateMean = (arr: number[]) => arr.reduce((sum, value) => sum + value, 0) / arr.length;
    const calculateMedian = (arr: number[]) => {
        const sortedArr = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(sortedArr.length / 2);
        return sortedArr.length % 2 !== 0 ? sortedArr[mid] : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    };
    const calculateMode = (arr: number[]) => {
        const counts = arr.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {} as { [key: number]: number });

        let mode: number;
        let maxCount = 0;

        for (const value in counts) {
            if (counts[value] > maxCount) {
                mode = parseFloat(value);
                maxCount = counts[value];
            }
        }

        return mode!;
    };

    const generateClassStatistics = (
        dataset: DatasetEntry[],
        property: string,
        measure: string
    ): ClassStatistics => {
        const result: ClassStatistics = {};

        dataset.forEach((entry) => {
            const className = `class${entry[measure]}`;
            result[className] = result[className] || { Mean: 0, Median: 0, Mode: 0 };
            result[className].Mean = entry[property];
        });

        return result;
    };

    const classStatistics = generateClassStatistics(dataset, property, measure);
    const resultTable: ClassStatistics = {};

    for (const className in classStatistics) {
        const values = classStatistics[className];
        resultTable[className] = {
            Mean: calculateMean([values.Mean]),
            Median: calculateMedian([values.Mean]),
            Mode: calculateMode([values.Mean]),
        };
    }

    return resultTable;
};