import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import React, { useState } from 'react';
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
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<TParamsForm>(defaultArticleState);

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
		setIsOpen((state) => !state);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					style={{ rowGap: '50px' }}
					onSubmit={onSubmit}
					onReset={onReset}>
					<Text size={31} weight={800} uppercase={true}>
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
