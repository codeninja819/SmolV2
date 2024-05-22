import {useCallback, useEffect, useRef} from 'react';
import {usePlausible} from 'next-plausible';
import {SmolTokenAmountInput} from 'lib/common/SmolTokenAmountInput';
import {useTokenList} from '@builtbymom/web3/contexts/WithTokenList';
import {cl} from '@builtbymom/web3/utils';
import {SmolAddressInput} from '@lib/common/SmolAddressInput';
import {IconCircleCheck} from '@lib/icons/IconCircleCheck';
import {IconCircleCross} from '@lib/icons/IconCircleCross';
import {IconCross} from '@lib/icons/IconCross';
import {IconSpinner} from '@lib/icons/IconSpinner';
import {PLAUSIBLE_EVENTS} from '@lib/utils/plausible';

import {SendStatus} from './SendStatus';
import {useSendFlow} from './useSendFlow';
import {useSendQueryManagement} from './useSendQuery';
import {SendWizard} from './Wizard';

import type {ReactElement} from 'react';
import type {TTokenAmountInputElement} from '@lib/types/Inputs';
import type {TInputAddressLike} from '@lib/utils/tools.address';

function SendTokenRow({input}: {input: TTokenAmountInputElement}): ReactElement {
	const {configuration, dispatchConfiguration} = useSendFlow();

	const onSetValue = (value: Partial<TTokenAmountInputElement>): void => {
		dispatchConfiguration({type: 'SET_VALUE', payload: {...value, UUID: input.UUID}});
	};

	const onRemoveInput = (): void => {
		dispatchConfiguration({type: 'REMOVE_INPUT', payload: {UUID: input.UUID}});
	};

	const renderIcon = (): ReactElement | null => {
		if (input.status === 'pending') {
			return <IconSpinner className={'size-4'} />;
		}
		if (input.status === 'success') {
			return <IconCircleCheck className={'text-green size-4'} />;
		}
		if (input.status === 'error') {
			return <IconCircleCross className={'text-red size-4'} />;
		}
		return null;
	};

	const iconContainerStyle = 'absolute -right-10 top-1/2 -translate-y-1/2';

	return (
		<div className={'relative'}>
			<SmolTokenAmountInput
				onSetValue={onSetValue}
				value={input}
			/>
			{configuration.inputs.length > 1 && input.status === 'none' && (
				<button
					className={cl(
						iconContainerStyle,
						'-right-7 md:-right-11 p-1 text-neutral-600 transition-colors hover:text-neutral-700'
					)}
					onClick={onRemoveInput}>
					<IconCross className={'size-4'} />
				</button>
			)}

			<div className={iconContainerStyle}>{renderIcon()}</div>
		</div>
	);
}

export function Send(): ReactElement {
	const plausible = usePlausible();
	const {configuration, dispatchConfiguration} = useSendFlow();
	const {hasInitialInputs} = useSendQueryManagement();
	const inputRef = useRef<HTMLInputElement>(null);
	const {currentNetworkTokenList} = useTokenList();

	const isReceiverERC20 = Boolean(
		configuration.receiver.address && currentNetworkTokenList[configuration.receiver.address]
	);

	const onAddToken = useCallback((): void => {
		plausible(PLAUSIBLE_EVENTS.ADD_TOKEN_OPTION);
		dispatchConfiguration({type: 'ADD_INPUT', payload: undefined});
	}, [dispatchConfiguration, plausible]);

	const onSetRecipient = (value: Partial<TInputAddressLike>): void => {
		dispatchConfiguration({type: 'SET_RECEIVER', payload: value});
	};

	//Add initial input
	useEffect(() => {
		if (!hasInitialInputs) {
			onAddToken();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasInitialInputs]);

	return (
		<div className={'max-w-108 w-full'}>
			<div className={'mb-6'}>
				<p className={'mb-2 font-medium'}>{'Receiver'}</p>
				<SmolAddressInput
					inputRef={inputRef}
					onSetValue={onSetRecipient}
					value={configuration.receiver}
				/>
			</div>
			<div>
				<p className={'mb-2 font-medium'}>{'Token'}</p>
				{configuration.inputs.map(input => (
					<div
						className={'mb-4'}
						key={input.UUID}>
						<SendTokenRow input={input} />
					</div>
				))}
			</div>
			<div className={'mb-4'}>
				<button
					onClick={onAddToken}
					className={
						'rounded-lg bg-neutral-200 px-5 py-2 text-xs text-neutral-700 transition-colors hover:bg-neutral-300'
					}>
					{'+ Add token'}
				</button>
			</div>
			<SendStatus isReceiverERC20={isReceiverERC20} />
			<SendWizard isReceiverERC20={isReceiverERC20} />
		</div>
	);
}
