import React from 'react'
import { Button, ButtonGroup } from "flowbite-react";
import { useParamsStore } from '@/hooks/useParamsStore';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill } from 'react-icons/bs';

const pageSizeButtons = [5, 10, 20];
const orderButton = [
    { label: 'Alphabetical', icon: AiOutlineSortAscending, value: 'make' },
    { label: 'End Date', icon: AiOutlineClockCircle, value: 'endingsoon' },
    { label: 'Recently Added', icon: BsFillStopCircleFill, value: 'new'}
];
const filterByButton = [
    { label: 'Live Auctions', icon: AiOutlineSortAscending, value: 'live' },
    { label: 'Ending < 6 hours', icon: AiOutlineClockCircle, value: 'endingSoon' },
    { label: 'Completed', icon: BsFillStopCircleFill, value: 'finished' }
];

export default function AppFilter() {
    const pageSize = useParamsStore(state => state.pageSize);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);
    const setParams = useParamsStore(state => state.setParams);

    return (
        <div className='flex justify-between items-center mb-4'>
            <ButtonGroup>
                {
                    filterByButton.map((value, index) => (
                        <Button
                            color={`${filterBy === value.value ? 'red' : 'gray'}`}
                            key={index}
                            className='focus:ring-0' 
                            onClick={() => setParams({ filterBy: value.value })}>
                                {value.label}
                        </Button>
                    ))
                }
            </ButtonGroup>
            <ButtonGroup>
                {
                    orderButton.map((value, index) => (
                        <Button
                            color={`${orderBy === value.value ? 'red' : 'gray'}`}
                            key={index}
                            className='focus:ring-0' 
                            onClick={() => setParams({ orderBy: value.value })}>
                                {value.label}
                        </Button>
                    ))
                }
            </ButtonGroup>
            <ButtonGroup>
                {pageSizeButtons.map((value, index) => (
                    <Button 
                        color={`${pageSize === value ? 'red' : 'gray'}`} 
                        key={index}
                        className='focus:ring-0' 
                        onClick={() => setParams({ pageSize: value })}>
                            {value}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    )
}
