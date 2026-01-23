'use client'

import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { useEffect, useState } from "react";
import { getData } from "../actions/auctionAction";
import AppFilter from "../components/AppFilter";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import AppEmptyFilter from "../components/AppEmptyFilter";
import { useAuctionStore } from "@/hooks/useAuctionStore";

export default function Listings() {
    const [loading, setLoading] = useState(true);
    
    const data = useAuctionStore(useShallow(state => ({
        auctions: state.auctions,
        totalCount: state.totalCount,
        pageCount: state.pageCount
    })));

    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner
    })));

    const setData = useAuctionStore(state => state.setData);
    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params}, { skipEmptyString: true })

    function setPageNumber(pageNumber: number) {
        setParams({pageNumber});
    }

    useEffect(() => {
        getData(url).then(response => {
            setData(response)
            setLoading(false)
        })
    }, [url, setData]);

    if (loading) return <h3>Loading ...</h3>

    return (
        <>
            <AppFilter />
            {data.totalCount == 0 ? ( 
                <AppEmptyFilter showReset />
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6 mt-4">
                        {data && data.auctions.map((auction: any) => (
                            <AuctionCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                    <AppPagination pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />
                </>  
            )}
        </>
    );
}