'use client';

import { useBidStore } from '@/hooks/useBidStore';
import { usePathname } from 'next/navigation';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }: 
    { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
  if (completed) {
    return "Auction Finshed";
  } else {
    return (
      <div className="flex gap-2 text-sm font-mono" suppressHydrationWarning>
        {days}:{hours}:{minutes}:{seconds}
      </div>
    );
  }
};

type Props = {
    auctionEnd: string;
}

export default function CountdownTimer({auctionEnd}: Props) {
    const setOpen = useBidStore(state => state.setOpen)
    const pathname = usePathname();

    function OnCountdownFinished(){
      if(pathname.startsWith('/auctions/details')) {
        setOpen(false)
      }
    }

    return (
        <div className="flex items-center justify-center w-30 h-7 border-2 bg-green-600 text-white text-sm font-semibold rounded-lg">
            <Countdown date={auctionEnd} renderer={renderer} onComplete={OnCountdownFinished} />
        </div>
    );
}