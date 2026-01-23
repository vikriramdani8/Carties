'use client'

import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { Auction, AuctionFinished, Bid } from '@/types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { User } from 'next-auth';
import { useParams } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import AppAuctionCreatedToast from '../components/AppAuctionCreatedToast';
import AppAuctionFinishedToast from '../components/AppAuctionFinishedToast';
import { getDetailedViewData } from '../actions/auctionAction';
import { useSession } from 'next-auth/react';

type Props = {
    children: ReactNode,
}

export default function SignalRProvider({ children }: Props) {
    const session = useSession();
    const user = session.data?.user;

    const connection = useRef<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const params = useParams<{ id: string }>();

    const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
        const auction = getDetailedViewData(finishedAuction.auctionId);
        return toast.promise(auction, {
            loading: 'loading',
            success: (auction) => <AppAuctionFinishedToast auction={auction} finishedAuction={finishedAuction}  />,
            error: (err) => 'Auction finished'
        }, {success: {duration: 10000, icon: null, position: 'bottom-right'}})
    }, [])

    const handleAuctionCreated = useCallback((auction: Auction) => {
        if (user?.username !== auction.seller) {
            return toast(<AppAuctionCreatedToast auction={auction} />, {
                duration: 3000,
                position: 'bottom-right'
            })
        }
    }, [user?.username])

    const handleBidPlaced = useCallback((bid: Bid) => {
        console.log(bid);
        if (bid.bidStatus.includes('Accepted')) {
            setCurrentPrice(bid.auctionId, bid.amount);
        }

        if (params.id === bid.auctionId) {
            addBid(bid);
        }

    }, [setCurrentPrice, addBid, params.id])

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
            .withAutomaticReconnect()
            .build();

        connection.current = newConnection;

        newConnection.start()
            .then(() => console.log('Connected to notification hub'))
            .catch(err => console.log(err));

        newConnection.on('BidPlaced', handleBidPlaced);
        newConnection.on('AuctionCreated', handleAuctionCreated);
        newConnection.on('AuctionFinished', handleAuctionFinished);

        return () => {
            newConnection.off('BidPlaced', handleBidPlaced);
            newConnection.off('AuctionCreated', handleAuctionCreated);
            newConnection.off('AuctionFinished', handleAuctionFinished);
            newConnection.stop();
        }
    }, [setCurrentPrice, handleBidPlaced])

    return (
        <>
            <Toaster />
            {children}
        </>
    )
}
