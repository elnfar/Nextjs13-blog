import prisma from '../lib/prismadb'

export interface IBlogParams {
  user?:string
  userId?: string;
  categories?: string
}

export default async function getBlogs(
  params: IBlogParams
) {
  try {

    const {
      userId,
      categories
    } = params

    let query:any = {};

    if(userId) {
      query.userId = userId
    }

    if(categories) {
      query.categories = categories
    }


    

    const listings = await prisma.listing.findMany({
      where:query,
      orderBy: {
        createdAt: 'desc'
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}