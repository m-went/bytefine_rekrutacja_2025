import { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import TextAreaEditControls from '../../molecules/TextAreaEditControls/TextAreaEditControls';

interface ImgProps {
	position: { x: number; y: number };
	id: string;
	onDelete: () => void;
	imgUrl: string;
}

const Img: React.FC<ImgProps> = ({ position, id, onDelete, imgUrl }) => {
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
				<img src={imgUrl} alt='SSelected image' className='max-w-full max-h-full' />
				<TextAreaEditControls
					listeners={listeners}
					attributes={attributes}
					startResizing={startResizing}
					onDelete={onDelete}
				/>
			</div>
		</div>
	);
};

export default Img;
