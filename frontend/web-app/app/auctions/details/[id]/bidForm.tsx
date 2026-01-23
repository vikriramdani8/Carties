import { placeBidForAuction } from '@/app/actions/auctionAction';
import { useBidStore } from '@/hooks/useBidStore';
import { numberWithCommas } from '@/lib/currencyFormat';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type Props = {
    auctionId: string;
    highBid: number;
}   

export default function BidForm({auctionId, highBid}: Props) {
    const { register, handleSubmit, resetField } = useForm({
        defaultValues: {
            amount: ''
        }
    });
    const addBid = useBidStore(state => state.addBid);

    function onSubmit(data: FieldValues) {
        if(data.amount && data.amount > 0) {
            if(data.amount > highBid) {
                placeBidForAuction(auctionId, +data.amount).then(bid => {
                if(bid.error) throw bid.error;
                    addBid(bid);
                    resetField('amount');
                }).catch(err => toast.error(err))
            } else {
                resetField('amount');
                return toast.error("The bids are to low", {
                    duration: 3000,
                    position: 'bottom-right'
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='flex items-center border-2 rounded-lg py-2'>
                
            <input 
                type='number'
                {...register('amount')}
                className='input-custom'
                placeholder={`place your bid (minimum bid is ${numberWithCommas(highBid+1)})`}
            />
        </form>
    )
}
