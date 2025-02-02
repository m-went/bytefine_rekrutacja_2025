import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface TextAreaEditControlsProps {
	listeners: SyntheticListenerMap | undefined;
	attributes: DraggableAttributes;
	startResizing: (e: React.MouseEvent) => void;
}

export type AllowedColors = 'black100' | 'white' | 'textcolor-red' | 'textcolor-blue' | 'textcolor-green';

const TextAreaEditControls: React.FC<TextAreaEditControlsProps> = ({ listeners, attributes, startResizing }) => {
	return (
		<>
			<div
				{...listeners}
				{...attributes}
				className='cursor-grab absolute top-[-20px] left-[-20px] size-[40px] p-[8px] rounded-full bg-white'
			>
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
		</>
	);
};

export default TextAreaEditControls;
