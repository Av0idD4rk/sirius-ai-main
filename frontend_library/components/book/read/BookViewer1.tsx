"use client"
import { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {useRouter} from "next/navigation";
import {AuthActions} from "@/lib/auth/utils";
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon} from "@heroicons/react/16/solid";
import withAuth from "@/components/auth/withAuth";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface BookViewerProps {
    bookId: number;
}

const BookViewer: React.FC<BookViewerProps> = ({bookId}) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookUrl, setBookUrl] = useState('');
    const [width, setWidth] = useState(600); // Default width for the PDF page rendering
    const router = useRouter();
    useEffect(()=>{
        const updateWidth = () => {
            setWidth(window.innerWidth > 768 ? 600 : window.innerWidth * 0.9); // 90% width for mobile screens
        };
        updateWidth()
        fetchPdf()
        window.addEventListener('resize', updateWidth); // Update on resize

        return () => window.removeEventListener('resize', updateWidth);
    })
    async function fetchPdf() {
        const accessToken = await AuthActions().getToken("access")
        const response = await fetch("/api/v1/books/" + bookId + "/read/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        }).then((res) => res.json())
        setBookUrl(response);


    }
    const onBack = ()=>{
        router.back()
    }
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => (numPages ? Math.min(prev + 1, numPages) : prev + 1));
    };

    return (
        <div className="flex flex-col items-center justify-center content-center bg-gray-100 min-h-screen">
            {/* Back Button */}
            <button onClick={onBack} className="self-start mb-4 text-blue-500 hover:underline">
                <ChevronLeftIcon className="w-8 h-8 mr-1" />
                <span>Назад</span>
            </button>

            {/* PDF Viewer */}
            <div className="relative w-full mt-20 flex justify-center">
                {bookUrl ? (
                    <Document file={bookUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={currentPage} width={width} />
                    </Document>
                ) : (
                    <p>Loading book...</p>
                )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-4 mt-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                    <ArrowLeftIcon className="w-6 h-6 mx-auto" />
                </button>
                <p>
                    Страница {currentPage} из {numPages}
                </p>
                <button
                    onClick={goToNextPage}
                    disabled={numPages ? currentPage === numPages : false}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                    <ArrowRightIcon className="w-6 h-6 mx-auto" />
                </button>
            </div>
        </div>
    );
};

export default withAuth(BookViewer);
