import React from 'react'

type Props = {
    amount?: number
    reservePrice: number
}

export default function CurentHighBid({amount, reservePrice}: Props) {
    const text = amount ? '$' + amount : 'No bids';
    const color = amount ? amount > reservePrice ? 'bg-green-600' : 'bg-amber-600' : 'bg-red-600';

    return (
        <div className={`flex items-center justify-center w-30 h-7 
            font-semibold rounded-lg text-white border-2 border-white text-sm ${color}`}>
                {text}
        </div>
    )
}
