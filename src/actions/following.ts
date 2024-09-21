'use server'

import prisma from '@/lib/prisma'
import { getCurrentUserId } from './getStories'

export const checkFollowing = async (authorId: string) => {
	const CurrentUserid = await getCurrentUserId()

	if (!CurrentUserid) return

	try {
		const IsFollowed = await prisma.following.findFirst({
			where: {
				followingId: authorId,
				followerId: CurrentUserid,
			},
		})

		return { ifFollowing: !!IsFollowed }
	} catch (error) {
		return { ifFollowing: false }
	}
}

export const numberFollowers = async (authorId: string) => {
	try {
		const noOfFollowing = await prisma.following.aggregate({
			where: {
				followingId: authorId,
			},
			_count: true,
		})

		return { followers: JSON.parse(JSON.stringify(noOfFollowing._count)) }
	} catch (error) {
		return { followers: 0 }
	}
}
