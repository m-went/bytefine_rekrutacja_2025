interface TextColorProps {
	selectorColor: string;
	isSelected: boolean;
	optionName: string;
}

const TextColor: React.FC<TextColorProps> = ({ selectorColor, isSelected, optionName }) => {
	return (
		<label className='relative flex items-center cursor-pointer'>
			<input type='radio' name={optionName} className='peer hidden' />
			<div className='size-[24px] rounded-full peer-checked:border-2 bg-transparent peer-checked:border-white flex items-center justify-center'>
				<div className={`size-[16px] rounded-full bg-${selectorColor}`}></div>
			</div>
		</label>
	);
};

export default TextColor;
