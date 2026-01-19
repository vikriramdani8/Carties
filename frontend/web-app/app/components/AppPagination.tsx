"use client"

import { useState } from "react"
import { Pagination } from "flowbite-react";

type Props = {
    currentPage: number;
    pageCount: number;
    pageChanged: (page: number) => void;
}

export default function AppPagination({ currentPage, pageCount, pageChanged }: Props) {
    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <Pagination 
                currentPage={currentPage} 
                totalPages={pageCount < 1 ? 1 : pageCount} 
                onPageChange={e => pageChanged(e)}
                className="text-blue-500 mb-5"
                layout="pagination"
                showIcons={true} />
        </div>
    );
}