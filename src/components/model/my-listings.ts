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
}

export interface Project {
    id: number
    projectId: string
    totalNma: string
    totalRevenue: string
}
