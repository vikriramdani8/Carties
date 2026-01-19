'use client'

import { Auction, PagedResult } from "@/types";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import { getData } from "../actions/auctionAction";
import AppFilter from "../components/AppFilter";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import AppEmptyFilter from "../components/AppEmptyFilter";

export default function Listings() {
    const [data, setData] = useState<PagedResult<Auction>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        pageCount: state.pageCount,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner
    })));

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params}, { skipEmptyString: true })

    function setPageNumber(pageNumber: number) {
        setParams({pageNumber});
    }

    useEffect(() => {
        getData(url).then(data2 => {
            setData(data2)
            setParams({
                pageCount: data2.pagecount
            })
        })
    }, [url]);

    if (!data) return <h3>Loading ...</h3>

    return (
        <>
            <AppFilter />
            {data.totalcount == 0 ? ( 
                <AppEmptyFilter showReset />
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6 mt-4">
                        {data && data.result.map((auction: any) => (
                            <AuctionCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                    <AppPagination pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={params.pageCount} />
                </>  
            )}
        </>
    );
}