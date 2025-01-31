interface ActionButtonProps {
	text: string;
	isDisabled: boolean;
	iconSrc: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ iconSrc, text, isDisabled = false }) => {
	return (
		<button
			disabled={isDisabled}
			className='button-core button-font relative disabled:bg-white97 disabled:opacity-25 bg-white97 h-[256px] w-[365px] rounded-[10px] p-[12px] transition-all ease-in-out duration-250 hover:bg-black25 focus:bg-white97 focus:shadow-[inset_0_0_0_4px] focus:shadow-primary50 flex flex-col justify-center items-center'
		>
			<div className='size-[128px] flex items-center justify-center'>
				<img
					className='size-[96px] m-4'
					src={iconSrc}
					style={{
						filter: 'invert(41%) sepia(0%) saturate(0%) hue-rotate(181deg) brightness(96%) contrast(89%)',
					}}
					aria-label='Button label'
				/>
			</div>

			<p className='absolute bottom-[12px]'>{text}</p>
		</button>
	);
};

export default ActionButton;
