'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
    auctionimage : string;
}

export default function CarImage({ auctionimage }: Props) {
    const [loading, setLoading] = useState(true);

    return (
        <Image
            src={auctionimage} 
            alt='Image of car'
            fill    
            className={`
                object-cover duration-100 ease-in-out 
                ${loading ? 'opacity-0 scale-110 grayscale' : 'opacity-100 scale-100 grayscale-0'}
            `}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"  
            onLoad={() => setLoading(false)}        
        />
    );
}