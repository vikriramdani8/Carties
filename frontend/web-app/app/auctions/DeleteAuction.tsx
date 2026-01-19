'use client'

import { Button, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { deleteAuction } from '../actions/auctionAction'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
    id: string
}

export default function DeleteAuction({id}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  
    function DeleteCurrentAuction(){
        setLoading(true);
        deleteAuction(id)
            .then(res => {
                if(res.error) throw res.error;
                router.push('/');
            })
            .catch(error => {
                toast.error(error.status + ' ' + error.message);
            })
            .finally(() => setLoading(false))
    }

    return (
        <Button color='red' onClick={DeleteCurrentAuction}>
            { loading ? (<Spinner size='m' className='mr-3' />) : 'Delete auction' }
        </Button>
    )
}
