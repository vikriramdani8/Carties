'use client'

import { Button } from 'flowbite-react'
import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import AppInput from '../components/AppInput';
import { useRouter, usePathname } from 'next/navigation';
import AppInputDate from '../components/AppInputDate';
import { createAuction, updateAuction } from '../actions/auctionAction';
import { ToastContainer, toast } from 'react-toastify';
import { Auction } from '@/types';

type Props = {
  auction?: Auction
}

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { control, register, handleSubmit, setFocus, reset,
    formState: { isSubmitting, isValid, errors, isDirty } } = useForm({
      mode: 'onTouched'
    });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus('make')
  }, [setFocus, auction, reset])

  async function onSubmit(data: FieldValues) {
    try {
      let res;
      if (pathname.startsWith('/auctions/create')) {
        res = await createAuction(data);
      } else {
        if (auction) {
          res = await updateAuction({ ...data, id: auction.id });
        }
      }

      if (res.error) {
        throw res.error;
      }

      if (pathname.startsWith('/auctions/create')) {
        router.push(`/auctions/details/${res.id}`);
      } else {
        router.push(`/auctions/details/${auction?.id}`);
      }
    } catch (error: any) {
      toast.error(error.status + ' ' + error.message);
    }
  }

  return (
    <div className='w-full border border-gray-200 p-3 shadow'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='font-bold text-2xl mb-4'>
          {pathname.startsWith('/auctions/create') ? 'New Auction' : 'Update Auction'}
        </h3>

        <AppInput label={'Make'} name={'make'} control={control} rules={{ required: 'Make is required' }} />
        <AppInput label={'Model'} name={'model'} control={control} rules={{ required: 'Model is required' }} />
        <AppInput label={'Color'} name={'color'} control={control} rules={{ required: 'Color is required' }} />

        <div className='grid grid-cols-2 gap-3'>
          <AppInput label={'Year'} type='number' name={'year'} control={control} rules={{ required: 'Year is required' }} />
          <AppInput label={'Mileage'} type='number' name={'mileage'} control={control} rules={{ required: 'Mileage is required' }} />
        </div>

        {pathname.startsWith('/auctions/create') &&
          <>
            <AppInput label={'Image Base Url'} name={'imageUrl'} control={control} rules={{ required: 'Image is required' }} />
            <div className='grid grid-cols-2 gap-3'>
              <AppInput label={'Reserve Price'} type='number' name={'reservePrice'} control={control} rules={{ required: 'Reserve price is required' }} />
              <AppInputDate
                label={'Auction end date '}
                name={'auctionEnd'}
                control={control}
                showTimeSelect
                dateFormat='dd MMMM yyyy h:mm a'
                rules={{ required: 'Auction end is required' }}
              />
            </div>
          </>}

        <div className='mt-2 flex justify-between'>
          <Button outline color='gray' onClick={() => router.back()}>Cancel</Button>
          <Button
            disabled={isSubmitting || !isValid}
            type='submit'
            outline
            color='success'>Submit</Button>
        </div>
      </form>
    </div>
  )
}
