import { useEffect, useState } from 'react';
import TextColor from '../../atoms/TextColor/TextColor';
import { useDraggable } from '@dnd-kit/core';
import TextAreaEditControls from '../../molecules/TextAreaEditControls/TextAreaEditControls';

interface TextAreaProps {
	position: { x: number; y: number };
	id: string;
}

export type AllowedColors = 'black100' | 'white' | 'textcolor-red' | 'textcolor-blue' | 'textcolor-green';

const TextArea: React.FC<TextAreaProps> = ({ position, id }) => {
	const [size, setSize] = useState({ width: 350, height: 120 });
	const [isResizing, setIsResizing] = useState(false);
	const [resizingStartPosition, setResizingStartPosition] = useState({ x: 0, y: 0 });

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	});

	const style: React.CSSProperties = {
		transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
		position: 'absolute',
		left: `${position.x}px`,
		top: `${position.y}px`,
	};

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

			const newPosition = {
				width: Math.max(350, size.width + (e.clientX - resizingStartPosition.x)),
				height: Math.max(120, size.height + (e.clientY - resizingStartPosition.y)),
			};

			if (newPosition.width < 350 || newPosition.height < 120) {
				stopResizing();
				return;
			}

			setSize(newPosition);

			setResizingStartPosition({ x: e.clientX, y: e.clientY });
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
	}, [isResizing, size.height, size.width, resizingStartPosition]);

	const startResizing = (e: React.MouseEvent) => {
		setIsResizing(true);
		setResizingStartPosition({ x: e.clientX, y: e.clientY });
	};

	return (
		<div ref={setNodeRef} style={style}>
			<div
				style={{ width: `${size.width}px`, height: `${size.height}px` }}
				className='bg-transparent px-[24px] py-[12px] border-2 border-primary relative'
			>
				<TextAreaEditControls listeners={listeners} attributes={attributes} startResizing={startResizing} />
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
