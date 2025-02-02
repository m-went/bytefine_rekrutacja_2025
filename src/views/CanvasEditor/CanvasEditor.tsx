import { DndContext, DragEndEvent, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ActionButton from '../../components/molecules/ActionButton/ActionButton';
import TextArea from '../../components/organisms/TextArea/TextArea';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { v4 as uuidv4 } from 'uuid';
import Img from '../../components/organisms/Img/Img';

export type ButtonsType = 'background' | 'img' | 'text';
const CanvasEditor = () => {
	const [textAreas, setTextAreas] = useState<{ x: number; y: number; id: string }[]>([]);
	const [images, setImages] = useState<{ url: string; id: string; position: { x: number; y: number } }[]>([]);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			event.target.value = '';

			const reader = new FileReader();
			reader.onload = () => {
				setImages((imgs) => [...imgs, { url: reader.result as string, id: uuidv4(), position: { x: 0, y: 0 } }]);
			};
			reader.readAsDataURL(file);
		}
	};

	const { setNodeRef } = useDroppable({ id: 'droppble' });

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	);
	const actionButtonsList: {
		text: string;
		iconSrc: string;
		onClick: (e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>) => void;
		type: ButtonsType;
	}[] = [
		{
			text: 'Text',
			iconSrc: 'icons/text.svg',
			onClick: () => setTextAreas((areas) => [...areas, { x: 0, y: 0, id: uuidv4() }]),
			type: 'text' as ButtonsType,
		},
		{
			text: 'Image',
			iconSrc: 'icons/img.svg',
			onClick: (e) => handleImageUpload(e as ChangeEvent<HTMLInputElement>),
			type: 'img' as ButtonsType,
		},
		{
			text: 'Background',
			iconSrc: 'icons/background.svg',
			onClick: () => console.log('click'),
			type: 'img' as ButtonsType,
		},
	];

	const handleDragEnd = (event: DragEndEvent) => {
		if (event.delta) {
			setTextAreas((areas) =>
				areas.map((area) => {
					if (area.id === event.active.id) {
						return { x: area.x + event.delta.x, y: area.y + event.delta.y, id: area.id };
					}

					return area;
				})
			);
			setImages((imgs) =>
				imgs.map((img) => {
					if (img.id === event.active.id) {
						return {
							position: { x: img.position.x + event.delta.x, y: img.position.y + event.delta.y },
							id: img.id,
							url: img.url,
						};
					}

					return img;
				})
			);
		}
	};

	const deleteElement = (id: string, type: 'textArea' | 'img') => {
		if (type === 'img') {
			setImages((imgs) => imgs.filter((img) => img.id !== id));
		}

		if (type === 'textArea') {
			setTextAreas((areas) => areas.filter((area) => area.id !== id));
		}
	};

	return (
		<div className='w-screen h-screen columns-2 py-[66px] px-[189px]'>
			<div className='h-full relative' style={{ background: 'red' }}>
				<DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
					<div ref={setNodeRef} className='relative h-full'>
						<img src='canvasEditor_background.png' className='absolute top-0 left-0 w-full h-full' />
						{textAreas.map((area) => (
							<TextArea
								key={area.id}
								id={area.id}
								position={{ x: area.x, y: area.y }}
								onDelete={() => deleteElement(area.id, 'textArea')}
							/>
						))}
						{images.map((img) => (
							<Img
								imgUrl={img.url}
								key={img.id}
								id={img.id}
								position={{ x: img.position.x, y: img.position.y }}
								onDelete={() => deleteElement(img.id, 'img')}
							/>
						))}
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
						return (
							<ActionButton
								key={button.text}
								text={button.text}
								iconSrc={button.iconSrc}
								onClick={button.onClick}
								type={button.type}
							/>
						);
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
