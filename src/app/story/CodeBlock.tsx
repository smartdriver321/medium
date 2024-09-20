import React, { useEffect, useState } from 'react'
import { ClipboardPaste } from 'lucide-react'
import hljs from 'highlight.js'

export default function CodeBlock({ handleSave }: { handleSave: () => void }) {
	const [language, setlanguage] = useState<string>('javascript')
	const [code, setCode] = useState<string>('')
	const [highlightedCode, sethighlightedCode] = useState<string>('')

	console.log(code)

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setlanguage(event.target.value)
	}

	const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		event.preventDefault()
		setCode(event.currentTarget.value || '')
	}

	const handlePaste = async () => {
		try {
			const clipboardData = await navigator.clipboard.readText()
			console.log(clipboardData)

			setCode((prev) => prev + clipboardData)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const highlighted = hljs.highlight(code, {
			language,
			ignoreIllegals: true,
		}).value
		sethighlightedCode(highlighted)
		handleSave()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language, code, highlightedCode])

	return (
		<div className='w-full'>
			<div className='w-full relative bg-stone-100 rounded-sm p-5 focus:outline-none'>
				<div>
					<select
						contentEditable={false}
						className='bg-gray-100 border-dotted border-[2px] rounded-sm p-1 text-stone-700'
						defaultValue={language}
						onChange={handleLanguageChange}
					>
						<option value='javascript'>JavaScript</option>
						<option value='python'>Python</option>
						<option value='java'>Java</option>
					</select>
				</div>
				<textarea
					className='focus:outline-none p-2 w-full mt-4'
					onChange={(e) => {
						e.preventDefault()
						handleCodeChange(e)
					}}
					onPaste={handlePaste}
				/>
				<button
					onClick={handlePaste}
					className='absolute top-2 right-2 cursor-pointer'
				>
					<ClipboardPaste />
				</button>
				<div
					className={`language-${language} text-base block overflow-auto p-3 focus:outline-none`}
					dangerouslySetInnerHTML={{ __html: highlightedCode }}
					style={{ whiteSpace: 'pre-wrap' }}
				></div>
			</div>
			<p data-p-placeholder='Write your text ...'></p>
		</div>
	)
}
