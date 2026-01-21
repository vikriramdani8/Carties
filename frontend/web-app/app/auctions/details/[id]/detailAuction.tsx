import { Auction } from '@/types'

type Props = {
    auction: Auction
}

export default function DetailAuction({auction} : Props) {
  return (
    <div className="space-y-3">
        <div className="flex justify-between p-2 border-b">
            <span className="text-gray-600">Seller</span>
            <span className="font-medium text-gray-900">{auction.seller}</span>
        </div>
        <div className="flex justify-between p-2 border-b">
            <span className="text-gray-600">Status</span>
            <span className={`font-medium ${auction.status === 'Live' ? 'text-green-600' : 'text-red-600'}`}>{auction.status}</span>
        </div>
        <div className="flex justify-between p-2 border-b">
            <span className="text-gray-600">Mileage</span>
            <span className="font-medium text-gray-900">{auction.mileage.toLocaleString()} mi</span>
        </div>
        <div className="flex justify-between p-2 border-b">
            <span className="text-gray-600">Color</span>
            <span className="font-medium text-gray-900">{auction.color}</span>
        </div>
        <div className="flex justify-between p-2 border-b">
            <span className="text-gray-600">Reserve Price</span>
            <span className="font-medium text-gray-900">{auction.reservePrice && auction.reservePrice > 0 ? auction.reservePrice : 'No Reserve'}</span>
        </div>
        <div className="flex justify-between p-2">
            <span className="text-gray-600">Current High Bid</span>
            <span className="font-bold text-lg text-blue-600">
                {auction.currentHighBid ? `$${auction.currentHighBid.toLocaleString()}` : 'No bids'}
            </span>
        </div>
    </div>
  )
}
