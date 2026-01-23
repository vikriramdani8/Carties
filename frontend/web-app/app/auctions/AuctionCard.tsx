import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import CarImage from './CarImage';
import CurentHighBid from './CurentHighBid';

type Props = {
    auction: any;
};

export default function AuctionCard(pros: Props) {
    return (
        <Link href={`/auctions/details/${pros.auction.id}`}>
            <div className="relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden">
                <CarImage auctionimage={pros.auction.imageUrl} />
                <div className='absolute bottom-2 left-2'>
                    <CountdownTimer auctionEnd={pros.auction.auctionEnd} />
                </div>
                 <div className='absolute top-2 right-2'>
                    <CurentHighBid reservePrice={pros.auction.reservePrice} amount={pros.auction.currentHighBid} />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className='text-gray-700'>{pros.auction.make} {pros.auction.model}</h3>
                <p className='font-semibold text-sm'>{pros.auction.year}</p>
            </div>
        </Link>
    );
}