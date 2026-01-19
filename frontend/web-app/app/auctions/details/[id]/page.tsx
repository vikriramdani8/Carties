
import { getDetailedViewData } from "@/app/actions/auctionAction";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import { getCurrentUser } from "@/app/actions/authActions";
import Link from "next/link";
import { Button } from "flowbite-react";
import DeleteAuction from "../../DeleteAuction";

export default async function Details({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getDetailedViewData(id);
    const user = await getCurrentUser();

    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between mt-5 mb-5'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-2xl font-semibold'>
                        {data.make} {data.model}
                    </h1>
                    {user?.username === data.seller && (
                        <><Button color='gray'>
                            <Link href={`/auctions/update/${data.id}`}>Update Auction</Link>
                        </Button><DeleteAuction id={data.id} /></>
                    )}
                </div>
                <div className='flex items-center'>
                    {/* TODO: Add logic for showing auth-based buttons if needed, for now just year */}
                    <h1 className='text-2xl font-bold text-gray-700'>{data.year}</h1>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
                <div className='w-full bg-gray-200 aspect-video rounded-lg overflow-hidden relative'>
                    <CarImage auctionimage={data.imageUrl} />
                </div>

                <div className='border-2 rounded-lg p-4 bg-gray-50'>
                    <div className='flex gap-2 items-center mb-4'>
                        <h3 className="text-gray-700 font-semibold">Time Remaining:</h3>
                        <CountdownTimer auctionEnd={data.auctionEnd} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between p-2 border-b">
                            <span className="text-gray-600">Seller</span>
                            <span className="font-medium text-gray-900">{data.seller}</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span className="text-gray-600">Status</span>
                            <span className={`font-medium ${data.status === 'Live' ? 'text-green-600' : 'text-red-600'}`}>{data.status}</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span className="text-gray-600">Mileage</span>
                            <span className="font-medium text-gray-900">{data.mileage.toLocaleString()} mi</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span className="text-gray-600">Color</span>
                            <span className="font-medium text-gray-900">{data.color}</span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                            <span className="text-gray-600">Reserve Price</span>
                            <span className="font-medium text-gray-900">{data.reservePrice && data.reservePrice > 0 ? data.reservePrice : 'No Reserve'}</span>
                        </div>
                        <div className="flex justify-between p-2">
                            <span className="text-gray-600">Current High Bid</span>
                            <span className="font-bold text-lg text-blue-600">
                                {data.currentHighBid ? `$${data.currentHighBid.toLocaleString()}` : 'No bids'}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}