import type {TAddress, TToken} from '@builtbymom/web3/types';

/**************************************************************************************************
 ** The TSelectCallback type is an helper type used to type the callback function that is called
 ** when a token is selected.
 *************************************************************************************************/
export type TSelectCallback = (item: TToken) => void;

/**************************************************************************************************
 ** The TWalletLayoutProps type is used to type the props of the WalletLayout component.
 *************************************************************************************************/
export type TWalletLayoutProps = {
	filteredTokens: TToken[];
	selectedTokenAddresses?: TAddress[];
	isLoading: boolean;
	onSelect?: TSelectCallback;
	searchTokenAddress?: TAddress;
	chainID: number;
	onOpenChange: (isOpen: boolean) => void;
};

/**************************************************************************************************
 ** The TBalancesCurtain type is used to type the props of the BalancesCurtain component.
 *************************************************************************************************/
export type TBalancesCurtain = {
	isOpen: boolean;
	tokensWithBalance: TToken[];
	isLoading: boolean;
	onSelect: TSelectCallback | undefined;
	selectedTokenAddresses?: TAddress[];
	chainID: number;
	onOpenChange: (isOpen: boolean) => void;
};

/**************************************************************************************************
 ** The TBalancesCurtainContextProps type is used to type the props of the BalancesCurtainContext
 ** component.
 *************************************************************************************************/
export type TBalancesCurtainContextProps = {
	shouldOpenCurtain: boolean;
	tokensWithBalance: TToken[];
	isLoading: boolean;
	onOpenCurtain: (callbackFn: TSelectCallback, _chainID?: number) => void;
	onCloseCurtain: () => void;
};

/**************************************************************************************************
 ** The TBalancesCurtainContextAppProps type is used to type the props of the
 ** BalancesCurtainContextApp context component.
 *************************************************************************************************/
export type TBalancesCurtainContextAppProps = {
	children: React.ReactElement;
	selectedTokenAddresses?: TAddress[];
};
