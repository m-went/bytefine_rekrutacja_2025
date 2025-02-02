import { MouseEvent, ChangeEvent } from 'react';
import { ButtonsType } from '../../../views/CanvasEditor/CanvasEditor';

interface ActionButtonProps {
	text: string;
	iconSrc: string;
	onClick: (e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>) => void;
	type: ButtonsType;
}

const ActionButton: React.FC<ActionButtonProps> = ({ iconSrc, text, onClick, type }) => {
	return (
		<>
			{type === 'img' ? (
				<label
					htmlFor='imageInput'
					className='button-core button-font relative disabled:bg-white97 disabled:opacity-25 bg-white97 h-[256px] w-[365px] rounded-[10px] p-[12px] transition-all ease-in-out duration-250 hover:bg-black25 focus:bg-white97 focus:shadow-[inset_0_0_0_4px] focus:shadow-primary50 flex flex-col justify-center items-center'
				>
					<input
						type='file'
						accept='image/*'
						className='hidden'
						id='imageInput'
						onChange={onClick as (e: ChangeEvent<HTMLInputElement>) => void}
					/>
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
				</label>
			) : (
				<button
					onClick={onClick}
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
			)}
		</>
	);
};

export default ActionButton;
