
import { getBidsForAuction, getDetailedViewData } from "@/app/actions/auctionAction";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import { getCurrentUser } from "@/app/actions/authActions";
import Link from "next/link";
import { Button } from "flowbite-react";
import DeleteAuction from "../../DeleteAuction";
import DetailAuction from "./detailAuction";
import BidItem from "./bidItem";
import BidList from "./bidList";

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
                    <h1 className='text-2xl font-bold text-gray-700'>{data.year}</h1>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-3'>
                <div className='w-full bg-gray-200 aspect-video rounded-lg overflow-hidden relative'>
                    <CarImage auctionimage={data.imageUrl} />
                </div>

                <DetailAuction auction={data} />
                <BidList auction={data} user={user} key={data.id} />
            </div>
        </div>
    );
}