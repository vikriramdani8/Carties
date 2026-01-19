import { getDetailedViewData } from "@/app/actions/auctionAction";
import AuctionForm from "../../AuctionForm";

export default async function Update({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getDetailedViewData(id);

  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <AuctionForm auction={data} />
    </div>
  )
}
