import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
    onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload}: Props) => {
    const { CSVReader } = useCSVReader();

    //TODO: Add a paywall

    return (
        <CSVReader onUploadAccepted = {onUpload}>
            {({ getRootProps }: any) => (
                <Button
                    variant="outline"
                    className="group w-full h-12 border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    {...getRootProps()}
                >
                    <Upload className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Import CSV
                </Button>
            )}
        </CSVReader>
    )
}