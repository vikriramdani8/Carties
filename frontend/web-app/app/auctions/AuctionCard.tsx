import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import CarImage from './CarImage';

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
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className='text-gray-700'>{pros.auction.make} {pros.auction.model}</h3>
                <p className='font-semibold text-sm'>{pros.auction.year}</p>
            </div>
        </Link>
    );
}