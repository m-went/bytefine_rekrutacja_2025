import { DndContext, DragEndEvent, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ActionButton from '../../components/molecules/ActionButton/ActionButton';
import TextArea from '../../components/organisms/TextArea/TextArea';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { useState } from 'react';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { v4 as uuidv4 } from 'uuid';

const CanvasEditor = () => {
	const [textAreas, setTextAreas] = useState<{ x: number; y: number; id: string }[]>([{ x: 0, y: 0, id: uuidv4() }]);
	const { setNodeRef } = useDroppable({ id: 'droppble' });

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	);
	const actionButtonsList = [
		{ text: 'Text', iconSrc: 'icons/text.svg' },
		{ text: 'Image', iconSrc: 'icons/img.svg' },
		{ text: 'Background', iconSrc: 'icons/background.svg' },
	];

	function handleDragEnd(event: DragEndEvent) {
		if (event.delta) {
			setTextAreas((areas) =>
				areas.map((area) => {
					if (area.id === event.active.id) {
						return { x: area.x + event.delta.x, y: area.y + event.delta.y, id: area.id };
					}

					return area;
				})
			);
		}
	}

	return (
		<div className='w-screen h-screen columns-2 py-[66px] px-[189px]'>
			<div className='h-full relative' style={{ background: 'red' }}>
				<DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
					<div ref={setNodeRef} className='relative h-full'>
						<img src='canvasEditor_background.png' className='absolute top-0 left-0 w-full h-full' />
						<TextArea id={textAreas[0].id} position={{ x: textAreas[0].x, y: textAreas[0].y }} />
					</div>
				</DndContext>
			</div>
			<div className='h-full flex flex-col'>
				<div>
					<div className='flex'>
						<img src='icons/logo.svg' />
						<p>CanvasEditor</p>
					</div>
					<button className='bg-midnight'>
						Reset
						<img src='icons/reset.svg' />
					</button>
				</div>
				<div />

				<div>
					<p>Add content</p>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					{actionButtonsList.map((button) => {
						return <ActionButton key={button.text} text={button.text} isDisabled={false} iconSrc={button.iconSrc} />;
					})}
				</div>
				<div className='flex gap-1.5'></div>
				<div />
				<PrimaryButton text={'Export to PNG'} isDisabled={false} />
			</div>
		</div>
	);
};

export default CanvasEditor;
