'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import axios from 'axios'

import SaveStoryPopUp from './SaveStoryPopup'

type Props = {
	storyId: string
	currentUserId: string
	currentUserFirstName: string | null
	currentUserLastName: string | null
}

export default function NavbarStory({
	storyId,
	currentUserFirstName,
	currentUserLastName,
	currentUserId,
}: Props) {
	const [showPopup, setShowPopup] = useState<boolean>(false)

	const router = useRouter()

	const publishStory = async (topics: string[]) => {
		try {
			const response = await axios.patch('/api/publish-new-story', {
				storyId,
				topics,
			})
			router.push(`/published/${response.data.id}`)
		} catch (error) {
			console.log('Error publishing the story', error)
		}
	}

	return (
		<div className='px-8 py-2 border-b-[1px]'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-3'>
					<Link href='/'>
						<Image
							src='/medium-icon.svg'
							width={40}
							height={40}
							alt='Medium Logo'
						/>
					</Link>
				</div>
				<div className='flex items-center space-x-7'>
					<button
						onClick={() => setShowPopup(!showPopup)}
						className='flex items-center opacity-90 hover:opacity-100 duration-100 ease-in cursor-pointer bg-green-600 hover:bg-green-700 rounded-full px-3 py-1 text-[13px] text-white'
					>
						Publish
					</button>
					<UserButton signInUrl='/' />
				</div>
			</div>
			{showPopup && (
				<SaveStoryPopUp
					storyId={storyId}
					publishStory={publishStory}
					setShowPopUp={setShowPopup}
					currentUserFirstName={currentUserFirstName}
					currentUserLastName={currentUserLastName}
					currentUserId={currentUserId}
				/>
			)}
		</div>
	)
}
