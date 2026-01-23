import { Auction, AuctionFinished } from '@/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { numberWithCommas } from '@/lib/currencyFormat'

type Props = {
    auction: Auction,
    finishedAuction: AuctionFinished
}

export default function AppAuctionFinishedToast({auction, finishedAuction}: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className='flex flex-col items-center'>
        <div className='flex flex-row items-center gap-2'>
            <Image 
                src={auction.imageUrl ?? 'https://img.freepik.com/premium-vector/cute-cartoon-car-illustration-isolated-white-background_1174662-3891.jpg?semt=ais_hybrid&w=740&q=80'}
                alt="Image of car"
                width={100}
                height={100}
                className='rounded-lg w-auto h-auto'
            />
            <span>Auction for {auction.make} {auction.model} has finished!</span> <br />
            {
                finishedAuction.itemSold && finishedAuction.amount ? (
                    <p>Congrats to {finishedAuction.winner} who was won this auction for $${numberWithCommas(finishedAuction.amount)}</p>
                ) : (
                    <p>This item did not sell</p>
                )
            }
        </div>
    </Link>
  )
}
