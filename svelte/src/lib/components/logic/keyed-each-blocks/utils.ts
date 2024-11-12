export const emojis = {
	apple: '🍎',
	banana: '🍌',
	carrot: '🥕',
	doughnut: '🍩',
	egg: '🥚'
};

export type Name = keyof typeof emojis;

type Fruits = {
	id: number;
	name: Name;
};

export const fruits: Fruits[] = [
	{ id: 1, name: 'apple' },
	{ id: 2, name: 'banana' },
	{ id: 3, name: 'carrot' },
	{ id: 4, name: 'doughnut' },
	{ id: 5, name: 'egg' }
];
