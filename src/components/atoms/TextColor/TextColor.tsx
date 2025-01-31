import { SetStateAction } from 'react';
import { AllowedColors } from '../../organisms/TextArea/TextArea';

interface TextColorProps {
	selectorColor: AllowedColors;
	isSelected: boolean;
	optionName: 'black' | 'white' | 'red' | 'blue' | 'green';
	setSelectedColor: React.Dispatch<
		SetStateAction<{
			bgColor: string;
			textColor: string;
			optionName: 'black' | 'white' | 'red' | 'blue' | 'green';
		}>
	>;
}

const TextColor: React.FC<TextColorProps> = ({ selectorColor, isSelected, optionName, setSelectedColor }) => {
	return (
		<label className='relative flex items-center cursor-pointer'>
			<input
				type='radio'
				id={optionName}
				value={selectorColor}
				name='textColor'
				onChange={() =>
					setSelectedColor({
						bgColor: `bg-${selectorColor}`,
						optionName,
						textColor: `${selectorColor}`,
					})
				}
				className='peer hidden'
				checked={isSelected}
			/>
			<div className='size-[24px] rounded-full peer-checked:border-2 bg-transparent peer-checked:border-white flex items-center justify-center'>
				<div className={`size-[16px] rounded-full`} style={{ backgroundColor: `var(--color-${selectorColor})` }} />
			</div>
		</label>
	);
};

export default TextColor;
