export interface MyListings {
    id: number
    listing_type: ListingType
    status: Status
    listingName: string
    listingStart: string
    auction_type: number
    auctionEnd: string
    comments: string
    account: Account
    project: Project
    nma: string
    minimumAsk: string
    buyNowPrice: any
    directSaleToken: string
    constraints: any[]
    offer: any[]
}

export interface ListingType {
    id: number
    listingType: string
    listingTypeLabel?: any
}

export interface Status {
    id: number
    status: string
    stage: string
    explanation: any
}

export interface Account {
    id: number
    accountId: string
    accountName: string
    notes: any
    accountStatus: string
    mpName: any
    contact: Contact
}

export interface Contact {
    firstName: string
    lastName: string
    email: string
    password: string
    mpStatus: string
    id: any
}

export interface Project {
    id: number
    projectId: string
    totalNma: string
    totalRevenue: string
    blockedUntil: any
    minimumNma: number
    blockException: boolean
}

export interface AuctionType {
    id: number
    auctionType: string
    auctionLabel?: any
}

export interface Constraint {
    id: number
    constraint: string
    buyLabel: string
    sellLabel: string
    constraintType: string
}

export interface Tract {
    id: number
    tractId: string
    township: string
    range: string
    section: string
    country: string
    state: string
    royalityInterest: string
    costPerNma: string
    totalNma: string
}

export interface MyListing {
    listing_type: any
    status: any
    listingName: string
    listingStart: any
    auction_type: any
    auctionEnd: any
    comments: string
    account: any
    project: any
    nma: any
    minimumAsk: any
    buyNowPrice: any
    constraints: any[]
    offer: any[]
    id?: any
    directSaleToken: any

}

export interface ContactAccount {
    id: number
    account: Account
    project: Project
    investmentAmount: string
    acquiredNma: string
    status: string
    blockException: boolean
}

export interface ListingCost {
    costPerNma: number
    totalCost: number
    totalNma: number
    ct: number
}

export interface IncomListing {
    incomeToDate: number
    availableNma: number
    totalNma: number
    minimumNma: number
}

export interface ContactListing {
    listingId: number
    listingName: string
    auctionEnd: string
    "Account/Project": string
    status: string
    contact_id: number
    listedNMA: number
    minimumAsk: number
    highestBid: any
    "# Bids": number
    isAuctionEnd: any
    isListingStart: any
}
export interface CashConfig {
    id?: any,
    noOfMonths: any,
    decline: any,
    gasPrice: any,
    oilPrice: any
    contact: any
}