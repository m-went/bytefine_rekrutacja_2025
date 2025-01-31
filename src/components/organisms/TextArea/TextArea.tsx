import { useEffect, useState } from 'react';
import TextColor from '../../atoms/TextColor/TextColor';

interface TextAreaProps {
	position: string;
}

export type AllowedColors = 'black100' | 'white' | 'textcolor-red' | 'textcolor-blue' | 'textcolor-green';

const TextArea: React.FC<TextAreaProps> = ({ position }) => {
	const [size, setSize] = useState({ width: 350, height: 120 });
	const [isResizing, setIsResizing] = useState(false);
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

	const textColorsList: { selectorColor: AllowedColors; optionName: 'black' | 'white' | 'red' | 'blue' | 'green' }[] = [
		{ selectorColor: 'black100', optionName: 'black' },
		{ selectorColor: 'white', optionName: 'white' },
		{ selectorColor: 'textcolor-red', optionName: 'red' },
		{ selectorColor: 'textcolor-blue', optionName: 'blue' },
		{ selectorColor: 'textcolor-green', optionName: 'green' },
	];

	const [selectedColor, setSelectedColor] = useState<{
		bgColor: string;
		textColor: string;
		optionName: 'black' | 'white' | 'red' | 'blue' | 'green';
	}>({
		bgColor: `bg-${textColorsList[0].selectorColor}`,
		textColor: `${textColorsList[0].selectorColor}`,
		optionName: 'black',
	});

	useEffect(() => {
		const resize = (e: MouseEvent) => {
			if (!isResizing) return;

			console.log('start pos', { x: e.clientX, y: e.clientY });
			const newPosition = {
				width: Math.max(350, size.width + (e.clientX - startPosition.x)),
				height: Math.max(120, size.height + (e.clientY - startPosition.y)),
			};

			if (newPosition.width < 350 || newPosition.height < 120) {
				stopResizing();
				return;
			}

			setSize(newPosition);

			setStartPosition({ x: e.clientX, y: e.clientY });
		};

		const stopResizing = () => setIsResizing(false);

		if (isResizing) {
			document.addEventListener('mousemove', resize);
			document.addEventListener('mouseup', stopResizing);
		}

		return () => {
			document.removeEventListener('mousemove', resize);
			document.removeEventListener('mouseup', stopResizing);
		};
	}, [isResizing, size.height, size.width, startPosition]);

	const startResizing = (e: React.MouseEvent) => {
		setIsResizing(true);
		setStartPosition({ x: e.clientX, y: e.clientY });
	};

	return (
		<div>
			<div
				style={{ width: `${size.width}px`, height: `${size.height}px` }}
				className='bg-transparent px-[24px] py-[12px] border-2 border-primary relative'
			>
				<div className='cursor-grab absolute top-[-20px] left-[-20px] size-[40px] p-[8px] rounded-full bg-white'>
					<img
						className='size-[24px]'
						style={{
							filter: 'invert(16%) sepia(95%) saturate(5393%) hue-rotate(276deg) brightness(72%) contrast(109%)',
						}}
						src='icons/move.svg'
						aria-label='Area holder'
					/>
				</div>
				<div className='cursor-pointer absolute top-[-12px] right-[-13px] size-[24px] p-[3px] rounded-full bg-white'>
					<img
						className='size-[18px]'
						src='icons/delete.svg'
						style={{
							filter: 'invert(8%) sepia(91%) saturate(6917%) hue-rotate(3deg) brightness(105%) contrast(110%)',
						}}
						aria-label='Area delete button'
					/>
				</div>
				<button
					onMouseDown={startResizing}
					className='cursor-nw-resize absolute bottom-[-12px] right-[-13px] size-[24px] rounded-full bg-primary border-white border-4'
				/>
				<textarea
					placeholder={'Type your text here'}
					style={{ color: `var(--color-${selectedColor.textColor})` }}
					className={`w-full h-full resize-none font-bold text-[32px] leading-[48px] text-center outline-none border-none placeholder-black100 placeholder:opacity-25 ${selectedColor.textColor}`}
				/>
			</div>
			<fieldset className='flex flex-row w-fit h-fit mt-[8px] ml-px'>
				{textColorsList.map((text) => {
					return (
						<TextColor
							key={text.optionName}
							selectorColor={text.selectorColor}
							optionName={text.optionName}
							isSelected={selectedColor.optionName === text.optionName}
							setSelectedColor={setSelectedColor}
						/>
					);
				})}
			</fieldset>
		</div>
	);
};

export default TextArea;
