"use client"

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import {useEffect, useState} from "react";
import {Document, Page} from "react-pdf";
import {pdfjs} from "react-pdf";
import {AuthActions} from "@/lib/auth/utils";
import {useRouter} from "next/navigation";
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon} from "@heroicons/react/16/solid";
import useSWR from "swr";
import {fetcher} from "@/lib/auth/fetcher";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface PdfProps {
    bookId: number;
}

export default function PdfReactPdf({bookId}: PdfProps) {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [src, setSrc] = useState<string>();
    const {data, isLoading} = useSWR('/api/v1/books/' + bookId + '/read/', fetcher)
    setSrc(data);
    const router = useRouter()
    const onBack = () => {
        router.back();
    }


    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="self-start mb-4 text-gray-600 hover:text-gray-800 flex items-center"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                <span>Back</span>
            </button>

            {/* Page Number Indicator */}
            <p className="text-sm text-gray-700 mb-2">
                Page {pageNumber} of {numPages}
            </p>

            {/* PDF Document Viewer */}
            <div className="w-full flex justify-center overflow-hidden max-h-screen">
                <Document
                    file={src}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="my-react-pdf"
                >
                    <Page
                        pageNumber={pageNumber}
                        className="shadow-md border border-gray-300 rounded-md"
                        width={window.innerWidth > 768 ? 500 : window.innerWidth * 0.85} // Smaller width for mobile
                    />
                </Document>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center w-full mt-4 space-x-4">
                <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className={`flex-1 p-2 rounded-md ${pageNumber <= 1 ? 'text-gray-300' : 'text-blue-500 hover:text-blue-700'}`}
                >
                    <ArrowLeftIcon className="w-6 h-6 mx-auto" />
                </button>
                <button
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className={`flex-1 p-2 rounded-md ${pageNumber >= numPages ? 'text-gray-300' : 'text-blue-500 hover:text-blue-700'}`}
                >
                    <ArrowRightIcon className="w-6 h-6 mx-auto" />
                </button>
            </div>
        </div>
    );
}