export interface MyOffers {
    listingId: number
    listingName: string
    offer_Status: string
    auctionEnd: string
    offerAmount: number
    offer_id: number
    accountName: string
    acccount_id: number
    projectId: string
    project_id: number
    status: string
    listedNMA: number
    minimumAsk: number
    highestBid: number
    noOfBids: number
    auctionType: string
    buyNowPrice: any
    isHighestOffer: boolean
    accountMpName: string
    isAuctionEnd: any
    isListingStart: any
    directSaleToken: any
}

export interface OfferDetails {
    offer: Offer
    listing_id: number
}

export interface Offer {
    offerAmount: number
    status: any
    contact: any
    constraints: any[]
    comments: string
}