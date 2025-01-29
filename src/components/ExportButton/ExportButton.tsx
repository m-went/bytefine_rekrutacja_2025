interface ExportButtonProps {
	text: string;
	isDisabled: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ text, isDisabled = false }) => {
	return (
		<button
			disabled={isDisabled}
			className='cursor-pointer disabled:cursor-not-allowed bg-primary px-[32px] py-[8px] h-[40px] w-auto min-w-[128px] rounded-[5px] font-semibold text-center text-[15px] leading-[22.5px] tracking-[0.5px] text-white hover:bg-button-hover focus:bg-primary focus:border-2 focus:border-primary50'
		>
			{text}
		</button>
	);
};

export default ExportButton;
