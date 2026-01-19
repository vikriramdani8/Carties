'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa';

export default function AppSearchbar() {
  const setParams = useParamsStore(state => state.setParams);
  const searchTerm = useParamsStore(state => state.searchTerm);
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSearch(){
    setParams({
      searchTerm: value
    });
  }

  useEffect(() => {
    if(searchTerm === '') setValue('');
  }, [searchTerm])

  return (
    <div className='w-[50%] h-10 rounded-4xl flex items-center pl-5 pr-1 border-[1px] border-black'>
        <input 
          onKeyDown={(e) => {
            console.log(e.key);
            if(e.key === 'Enter') {
              handleSearch();
            }
          }}
          onChange={handleChange} 
          value={value} 
          type="text" 
          className='w-100 flex-1 border-0 outline-0' />
        <button onClick={handleSearch} className='w-8 h-8 bg-red-400 rounded-2xl flex items-center justify-center'>
            <FaSearch color='white' className='w-5 h-5' />
        </button>
    </div>
  )
}
