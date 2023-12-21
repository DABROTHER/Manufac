import { DatasetEntry } from "../../interface";

export interface ClassStatisticsTableProps {
    dataset: DatasetEntry[];
    property: string;
    measure: string;
}