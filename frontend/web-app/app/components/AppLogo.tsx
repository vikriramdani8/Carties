'use client'

import { useParamsStore } from '@/hooks/useParamsStore';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineCar } from 'react-icons/ai'

export default function AppLogo() {
    const reset = useParamsStore(state => state.reset);
    
    const router = useRouter();
    const pathName = usePathname();

    function HandleReset() {
        if(pathName !== '/') router.push('/');
        reset();
    }

    return (
        <div onClick={HandleReset} className='text-2xl font-bold flex gap-2 cursor-pointer'>
            <AiOutlineCar size={34} />
            Carties Auctions
        </div>
    )
}
