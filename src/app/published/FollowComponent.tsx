'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { checkFollowing } from '@/actions/following'
import { getCurrentUserId } from '@/actions/getStories'

type Props = {
	authorId: string
}

export default function FollowComponent({ authorId }: Props) {
	const [isFollowed, setIsFollowed] = useState<boolean>(false)
	const [currentuserId, setCurrentuserId] = useState<string>()

	useEffect(() => {
		const fetchFollowingStatus = async () => {
			try {
				const response = await checkFollowing(authorId)
				if (response?.ifFollowing) setIsFollowed(response?.ifFollowing)
			} catch (error) {
				console.log('Error while fetching the following status', error)
			}
		}
		const fetchCurrentuserId = async () => {
			try {
				const userId = await getCurrentUserId()
				if (userId) setCurrentuserId(userId)
			} catch (error) {
				console.log('No user found')
			}
		}

		fetchFollowingStatus()
		fetchCurrentuserId()
	}, [authorId])

	const FollowAuthor = async () => {
		setIsFollowed(!isFollowed)
		try {
			await axios.post('/api/following', {
				authorId,
			})
			console.log('Success folloing')
		} catch (error) {
			console.log('Error in foloowing the author')
			setIsFollowed(!isFollowed)
		}
	}

	console.log(currentuserId)
	return (
		<span
			onClick={FollowAuthor}
			className={`font-medium  cursor-pointer ${
				isFollowed ? 'text-green-700' : 'text-red-400'
			} ${currentuserId === authorId ? 'hidden' : ''}`}
		>
			. {`${isFollowed ? 'followed' : 'follow'}`}
		</span>
	)
}
