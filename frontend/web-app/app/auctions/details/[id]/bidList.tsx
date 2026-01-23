'use client'

import { Auction, Bid } from '@/types'
import React, { useEffect, useState } from 'react'
import BidItem from './bidItem'
import { User } from 'next-auth'
import { useBidStore } from '@/hooks/useBidStore'
import { getBidsForAuction } from '@/app/actions/auctionAction'
import { toast } from 'react-toastify'
import AppEmptyFilter from '@/app/components/AppEmptyFilter'
import { numberWithCommas } from '@/lib/currencyFormat'
import BidForm from './bidForm'

type Props = {
    user: User | null;
    auction: Auction
}

export default function BidList({user, auction} : Props) {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);
    const open = useBidStore(state => state.open);
    const setOpen = useBidStore(state => state.setOpen);
    const openForBids = new Date(auction.auctionEnd) > new Date();

    const highBid = bids.reduce((prev, current) => prev > current.amount ? prev : current.amount, 0)

    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if(res.error || res.status == 401) {
                    throw res.error;
                }
                setBids(res as Bid[])
            }).catch(error => {
                toast.error(error.message ? error.message : "Error occured");
            })
            .finally(() => setLoading(false))
    }, [auction.id, setBids])

    useEffect(() => {
        setOpen(openForBids);
    }, [openForBids])

    if(loading) return <span>Loading bids ...</span>

    return (
        <div className='border-2 rounded-lg px-2 bg-gray-50 relative flex flex-col h-100'>
            <div className='sticky top-0 bg-white p-2'>
                <p className='text-xl'>Current High bid: <span className='font-bold'>${numberWithCommas(highBid)}</span></p>
            </div>
            <div className='flex-1 flex flex-col-reverse overflow-auto'>
                {
                    bids.length === 0 ? (
                        <AppEmptyFilter title='No bid data' subTitle='' />
                    ) : (
                        <>
                            {
                                bids.map(bid => (
                                    <BidItem key={bid.id} bid={bid} />
                                ))
                            }
                        </>
                    )
                }
            </div>
            <div className='pb-2 text-gray-500 bottom-0 bg-white py-2'>
                {
                    !open ? (
                        <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                            This auction has finished
                        </div>
                    ) :
                    !user ? (
                        <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                            Please login to make a bid
                        </div>
                    ) : user && user.username === auction.seller ? (
                        <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                            u can't bid ur own auction
                        </div>
                    ) : (
                        <BidForm auctionId={auction.id} highBid={highBid} />
                    )
                }
            </div>
        </div>
    )
}
