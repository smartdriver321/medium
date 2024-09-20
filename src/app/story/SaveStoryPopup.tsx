import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Story } from '@prisma/client'

import { getStoryById } from '@/actions/getStories'

type SaveStoryPopUpTypes = {
	storyId: string
	publishStory: (topics: string[]) => void
	setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>
	currentUserId: string
	currentUserFirstName: string | null
	currentUserLastName: string | null
}

export default function SaveStoryPopUp({
	storyId,
	publishStory,
	setShowPopUp,
	currentUserFirstName,
	currentUserLastName,
}: SaveStoryPopUpTypes) {
	const [story, setStory] = useState<Story>()
	const [selectedTopics, setSelectedTopics] = useState<string[]>([])

	useEffect(() => {
		const fetchStoryById = async () => {
			try {
				const result = await getStoryById(storyId)

				if (result.response) {
					setStory(result.response)
				}
			} catch (error) {
				console.log('Error fetching the story data', error)
			}
		}

		fetchStoryById()
	})

	const topics = [
		{ value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
		{ value: 'Python', label: 'Python' },
		{ value: 'Programming', label: 'Programming' },
		{ value: 'Fashion', label: 'Fashion' },
		{ value: 'World', label: 'World' },
		{ value: 'Politics', label: 'Politics' },
	]

	if (!story) return null

	// first 10 words for description

	const stripHtmlTags = (htmlString: string) => {
		return htmlString.replace(/<[^>]*>/g, '')
	}

	const contentWithoutH1 = story.content!.replace(
		/<h1[^>]*>[\s\S]*?<\/h1>/g,
		''
	)

	const textWithoutHtml = stripHtmlTags(contentWithoutH1)

	const first10Words = textWithoutHtml.split(/\s+/).slice(0, 10).join(' ')

	// H1 tag for heading

	const h1match = story.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)

	const h1Element = h1match ? h1match[1] : ''

	const h1elemntwithouttag = stripHtmlTags(h1Element)

	// imgage Src for Image preview

	const ImageMatch = story.content!.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/)

	const imgSrc = ImageMatch ? ImageMatch[1] : ''
	return (
		<div className='fixed bg-gray-50 w-full z-20 overflow-auto top-0 left-0 right-0 bottom-0'>
			<span
				onClick={(e) => {
					e.preventDefault()
					setShowPopUp(false)
				}}
				className='absolute top-4 right-6 text-3xl cursor-pointer'
			>
				&times;
			</span>
			<div className='max-w-[900px] mx-auto md:mt-28 mt-10 grid md:grid-cols-2 grid-cols-1 gap-14'>
				<div className='max-md:hidden'>
					<p className='font-semibold'>Story Preview</p>
					<div className='w-full h-[250px] bg-gray-100 rounded my-3 border-b-[1px]'>
						{imgSrc && (
							<Image
								src={imgSrc}
								alt='Preview Image'
								width={250}
								height={250}
								className='w-full h-full object-cover'
							/>
						)}
					</div>
					<h1 className='border-b-[1px] text-[18px] font-semibold py-2'>
						{h1elemntwithouttag}
					</h1>
					<p className='border-b-[1px] py-2 text-sm text-neutral-500 pt-3'>
						{first10Words}
					</p>
					<p className='font-medium text-sm pt-2'>
						Note:{' '}
						<span className='font-normal text-neutral-500'>
							Changes here will affect how your story appears in public places
							like Medium’s homepage and in subscribers’ inboxes — not the
							contents of the story itself.
						</span>
					</p>
				</div>
				<div>
					<p className='py-2'>
						Publishing to:{' '}
						<span>
							{currentUserFirstName} {currentUserLastName}
						</span>
					</p>
					<p className='text-sm pb-3 pt-1 '>
						Add or change topics (up to 5) so readers know what your story is
						about
					</p>
					<Select
						placeholder='tags'
						isMulti
						onChange={(selectedvalues) => {
							const values = selectedvalues as {
								value: string
								label: string
							}[]

							const stringValues = values.map((value) => value.value)

							setSelectedTopics(stringValues)
						}}
						name='topics'
						options={topics}
						className='basic-multi-select'
						classNamePrefix='Add a topic ...'
						isOptionDisabled={() => selectedTopics?.length >= 5}
					/>
					<button
						className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm mt-8'
						onClick={() => publishStory(selectedTopics)}
					>
						Publish now
					</button>
				</div>
			</div>
		</div>
	)
}
