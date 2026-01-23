import { numberWithCommas } from '@/lib/currencyFormat';
import { Bid } from '@/types'
import { format } from 'date-fns/format';
import React from 'react'

type Props = {
  bid: Bid
}

export default function BidItem({bid} : Props) {
  const color = bid.bidStatus == 'Accepted' ? 'bg-green-200' : bid.bidStatus == 'AcceptedBelowReserve' ? 'bg-amber-200' : 'bg-red-200';
  
  function getBidInfo(status: string) {
    let bgColor = '';
    let text = '';

    switch(bid.bidStatus) {
      case 'Accepted':
        bgColor = 'bg-green-200';
        text = 'Bid accepted';
        break;
      case 'AcceptedBelowReserve':
        bgColor = 'bg-amber-500';
        text = 'Reserve not met';
        break;
      case 'TooLow':
        bgColor = 'bg-red-200';
        text = 'Bid was too low';
        break;
      default:
        bgColor = 'bg-red-200';
        text = 'Bid placed after auction finished';
        break;
    }

    return { bgColor, text }
  }
  
  return (
    <div className={`${getBidInfo(bid.bidStatus).bgColor} p-2 rounded-lg border-gray-300 border-2 mb-1`}>
      <div className='flex justify-between align-top'>
        <p className='text-normal font-bold'>Bidder {bid.bidder}</p>
        <p className='text-normal font-bold'>${numberWithCommas(bid.amount)}</p>
      </div>
      <div className='flex justify-between align-top'>
        <p className='text-sm'>Time: {format(bid.bidTime, 'dd MMM yyyy hh:mm:ss a')}</p>
        <p className='text-sm'>{getBidInfo(bid.bidStatus).text}</p>
      </div>
    </div>
  )
}
