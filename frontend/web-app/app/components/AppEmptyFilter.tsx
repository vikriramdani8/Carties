'use client'

import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react';

type Props = {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
    callbackUrl?: string;
};

export default function AppEmptyFilter({
    title = 'No matches for this filter',
    subTitle = 'Try changing the filter or search term',
    showReset,
    showLogin,
    callbackUrl
}: Props) {
    const reset = useParamsStore(state => state.reset);

    return (
        <div className='w-full h-100 flex justify-center items-center gap-2 flex-col'>
            <h1 className='text-black'>{title}</h1>
            <p className='text-gray-400'>{subTitle}</p>

            {
                showReset && (
                    <Button 
                        onClick={reset}
                        className='border-blue-100 bg-white text-blue-100 mt-5 cursor-pointer'>
                        Remove filter
                    </Button>
                )
            }

            {
                showLogin && (
                    <Button outline onClick={() => signIn('id-server', { redirectTo: callbackUrl })}>
                        Login
                    </Button>
                )
            }
        </div>
    );
}
