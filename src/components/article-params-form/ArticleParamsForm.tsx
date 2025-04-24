import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	defaultArticleState,
	contentWidthArr,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export type TParamsForm = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

type ArticleParamsFormProps = {
	onSubmit?: (data: TParamsForm) => void;
};

export const ArticleParamsForm = (callbacks: ArticleParamsFormProps = {}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<TParamsForm>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	const onReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		callbacks.onSubmit?.(defaultArticleState);
	};
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		callbacks.onSubmit?.(formState);
	};

	const openForm = () => {
		setIsMenuOpen((state) => !state);
	};
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={openForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={rootRef}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text size={31} weight={800} uppercase={true} as={'h2'}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => {
							console.log(this);
							setFormState((state) => ({
								...state,
								fontFamilyOption: value,
							}));
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name={'font-size'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => {
							setFormState((state) => ({
								...state,
								fontSizeOption: value,
							}));
						}}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => {
							setFormState((state) => ({
								...state,
								fontColor: value,
							}));
						}}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => {
							setFormState((state) => ({
								...state,
								backgroundColor: value,
							}));
						}}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => {
							setFormState((state) => ({
								...state,
								contentWidth: value,
							}));
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
