import Image from 'next/image'
import React from 'react'
import { Story } from '@prisma/client'

import 'highlight.js/styles/github.css'
import FollowComponent from './FollowComponent'

type Props = {
	authorFirstName: string | null
	authorLastName: string | null
	authorImage: string
	publishedStory: Story
}

export default function RenderStory({
	authorFirstName,
	authorImage,
	authorLastName,
	publishedStory,
}: Props) {
	const stripHtmlTags = (htmlString: string) => {
		return htmlString.replace(/<[^>]*>/g, '')
	}

	const h1match = publishedStory.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)

	const h1Element = h1match ? h1match[1] : ''

	const h1elemntwithouttag = stripHtmlTags(h1Element)

	return (
		<div className='flex items-center justify-center mt-6 max-w-[800px] mx-auto'>
			<div>
				<h1 className='text-4xl font-bold my-8'>{h1elemntwithouttag}</h1>
				<div className='flex items-center space-x-5'>
					<Image
						src={authorImage}
						alt='user'
						width={44}
						height={44}
						className='rounded-full '
					/>
					<div className='text-sm'>
						<p>
							{authorFirstName} {authorLastName}{' '}
							<FollowComponent authorId={publishedStory.authorId} />
						</p>
						<p className='opacity-60'>
							Published on{' '}
							{new Date(publishedStory.updatedAt)
								.toDateString()
								.split(' ')
								.slice(1, 4)
								.join(' ')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
