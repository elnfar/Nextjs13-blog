import prisma from '../lib/prismadb'
 
interface IParams {
  blogId: string;
}

export default async function getBlogsById(
  params: IParams
) {
  try {
    const { blogId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: blogId,
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}