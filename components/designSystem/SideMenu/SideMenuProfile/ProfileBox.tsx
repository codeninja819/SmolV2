import {type ReactElement} from 'react';
import {AddressBookEntryAddress, AddressBookEntryAvatar} from 'components/designSystem/AddressBookEntry';
import {useAccount, useEnsAvatar} from 'wagmi';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';

export function ProfileBox(): ReactElement {
	const {address, ens} = useWeb3();
	const {isConnecting} = useAccount();
	const {data: avatar, isLoading: isLoadingAvatar} = useEnsAvatar({chainId: 1, name: ens});

	return (
		<div className={'flex gap-2'}>
			<AddressBookEntryAvatar
				sizeClassname={'h-10 w-10 min-w-[40px]'}
				isLoading={isLoadingAvatar || isConnecting}
				address={address}
				src={avatar}
			/>
			<AddressBookEntryAddress
				shouldTruncateAddress
				isConnecting={isConnecting}
				address={address}
				ens={ens}
			/>
		</div>
	);
}
