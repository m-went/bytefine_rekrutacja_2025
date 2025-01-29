import ActionButton from '../../components/molecules/ActionButton/ActionButton';

const CanvasEditor = () => {
	return (
		<div className='w-screen h-screen columns-2 py-[66px] px-[189px]'>
			<div className='h-full'>
				<div>
					<img src='canvasEditor_background.png' />
				</div>
			</div>
			<div className='h-full flex flex-col'>
				<div>
					<div className='flex'>
						<img src='icons/logo.svg' />
						<p>CanvasEditor</p>
					</div>
					<ActionButton text={'Reset'} isDisabled={false} />
					<button className='bg-midnight'>
						Reset
						<img src='icons/reset.svg' />
					</button>
				</div>
				<div />
				<div>
					<p>Add content</p>
				</div>
				<div>
					<button>Text</button>
					<button>Image</button>
					<button>Background</button>
				</div>
				<div />
				<button>Export to PNG</button>
			</div>
		</div>
	);
};

export default CanvasEditor;
