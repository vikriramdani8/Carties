export type PagedResult<T> = {
    result: T[];
    pagecount: number;
    totalcount: number;
}

export type Auction = {
    id: string
    createdAt: string
    updatedAt: string
    auctionEnd: string
    seller: string
    winner: string
    make: string
    model: string
    year: number
    color: string
    mileage: number
    imageUrl: string
    status: string
    reservePrice?: number
    soldAmount: number
    currentHighBid: number
}