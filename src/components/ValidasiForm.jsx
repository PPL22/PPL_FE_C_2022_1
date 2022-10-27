import React from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "flowbite-react";
function ValidasiForm({
  document,
  documentTitle,
  children,
  onClick,
  onSubmit,
}) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-full flex justify-center">
      <div
        className="fixed left-0 top-0 bottom-0 right-0 bg-black/20"
        onClick={onClick}
      ></div>
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        id="validasi-data-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="px-10 bg-background relative w-auto h-auto z-10 my-auto"
      >
        <div className="flex justify-between items-center pt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Validasi Data {documentTitle}
          </h2>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm"
            data-modal-toggle="entry-modal-modal"
            onClick={onClick}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-x-10 mt-10 pb-10">
          <div>
            <h3 className="text-gray-500 mb-5 font-medium">
              Hasil Upload {documentTitle}
            </h3>
            <div className="w-[400px] h-[500px] overflow-auto mb-2">
              <Document
                file={document}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    size="A4"
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ))}
              </Document>{" "}
            </div>
            <a href={document} target="_blank" rel="noreferrer">
              <Button>Lihat Lebih Detail</Button>
            </a>
          </div>
          <div className="mt-10 lg:mt-0">
            <h3 className="text-gray-500 mb-5 font-medium">Data Mahasiswa</h3>
            <form className="flex flex-col gap-y-4 " onSubmit={onSubmit}>
              {children}
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default ValidasiForm;
