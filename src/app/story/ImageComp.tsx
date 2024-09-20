/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { imageUpload } from '@/actions/cloudinary'

export default function ImageComp({
	imageUrl,
	file,
	handleSave,
}: {
	imageUrl: string
	file: File
	handleSave: () => void
}) {
	const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl)

	const updateImageUrl = async () => {
		try {
			const formData = new FormData()
			formData.append('file', file)

			await imageUpload(formData).then((secureImageUrl) =>
				setCurrentImageUrl(secureImageUrl)
			)
		} catch (error) {
			console.log('Error uplaoding the image', error)
		}
	}

	useEffect(() => {
		updateImageUrl().then(() => {
			handleSave()
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageUrl])

	return (
		<div className='py-3'>
			<div>
				<img
					src={currentImageUrl}
					alt='Image'
					className='max-w-full h-[450px]'
				/>
				<div className='text-center text-sm max-w-md mx-auto'>
					<p data-p-placeholder='Type caption for your image'></p>
				</div>
			</div>
			<p data-p-placeholder='...'></p>
		</div>
	)
}
