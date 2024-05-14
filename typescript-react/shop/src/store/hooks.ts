import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import { AppDispath, RootState } from './store.ts';

type DispathFunction = () => AppDispath;

export const useCartDispatch: DispathFunction = useDispatch;

export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
