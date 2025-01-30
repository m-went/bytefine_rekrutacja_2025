interface PrimaryButtonProps {
	text: string;
	isDisabled: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, isDisabled = false }) => {
	return (
		<button
			disabled={isDisabled}
			className='button-core button-font disabled:bg-black25 bg-primary px-[32px] py-[8px] h-[40px] w-auto min-w-[128px] rounded-[5px]  text-white hover:bg-primary-button-hover transition-all ease-in-out duration-250 focus:bg-primary focus:outline-2 focus:outline-primary50 focus:transition-none'
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
