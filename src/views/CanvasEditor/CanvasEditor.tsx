import ActionButton from '../../components/molecules/ActionButton/ActionButton';
import TextArea from '../../components/organisms/TextArea/TextArea';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const CanvasEditor = () => {
	const actionButtonsList = [
		{ text: 'Text', iconSrc: 'icons/text.svg' },
		{ text: 'Image', iconSrc: 'icons/img.svg' },
		{ text: 'Background', iconSrc: 'icons/background.svg' },
	];

	return (
		<div className='w-screen h-screen columns-2 py-[66px] px-[189px]'>
			<div className='h-full'>
				<div className='relative h-full'>
					<img src='canvasEditor_background.png' className='absolute top-0 left-0 w-full h-full' />
					<TextArea />
				</div>
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
