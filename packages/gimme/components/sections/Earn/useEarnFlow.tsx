import React, {createContext, useContext, useMemo, useReducer} from 'react';
import {optionalRenderProps} from 'lib/utils/react/optionalRenderProps';
import {zeroNormalizedBN} from '@builtbymom/web3/utils';

import type {TTokenAmountInputElement} from 'lib/types/Inputs';
import type {TOptionalRenderProps} from 'lib/utils/react/optionalRenderProps';
import type {Dispatch, ReactElement} from 'react';

export type TEarnConfiguration = {
	asset: TTokenAmountInputElement;
	opportunity: any;
};

export type TEarnActions =
	| {type: 'SET_ASSET'; payload: Partial<TTokenAmountInputElement>}
	| {type: 'RESET'; payload: undefined};

export type TEarn = {
	configuration: TEarnConfiguration;
	dispatchConfiguration: Dispatch<TEarnActions>;
};

const defaultProps: TEarn = {
	configuration: {
		// TODO: move to lib
		asset: {
			amount: '',
			normalizedBigAmount: zeroNormalizedBN,
			isValid: 'undetermined',
			token: undefined,
			status: 'none',
			UUID: crypto.randomUUID()
		},
		opportunity: undefined
	},

	dispatchConfiguration: (): void => undefined
};

const EarnContext = createContext<TEarn>(defaultProps);
export const EarnContextApp = ({children}: {children: TOptionalRenderProps<TEarn, ReactElement>}): ReactElement => {
	const configurationReducer = (state: TEarnConfiguration, action: TEarnActions): TEarnConfiguration => {
		switch (action.type) {
			case 'SET_ASSET': {
				return {
					...state,
					asset: {...state.asset, ...action.payload}
				};
			}
			case 'RESET':
				return {
					asset: {
						amount: '',
						normalizedBigAmount: zeroNormalizedBN,
						isValid: 'undetermined',
						token: undefined,
						status: 'none',
						UUID: crypto.randomUUID()
					},
					opportunity: undefined
				};
		}
	};

	const [configuration, dispatch] = useReducer(configurationReducer, defaultProps.configuration);

	const contextValue = useMemo(
		(): TEarn => ({
			configuration,
			dispatchConfiguration: dispatch
		}),
		[configuration]
	);

	return (
		<EarnContext.Provider value={contextValue}>{optionalRenderProps(children, contextValue)}</EarnContext.Provider>
	);
};

export const useEarnFlow = (): TEarn => {
	const ctx = useContext(EarnContext);
	if (!ctx) {
		throw new Error('EarnContext not found');
	}
	return ctx;
};
