import {Toaster} from 'react-hot-toast';
import PlausibleProvider from 'next-plausible';
import {WalletContextApp} from '@builtbymom/web3/contexts/useWallet';
import {WithMom} from '@builtbymom/web3/contexts/WithMom';
import {SafeProvider} from '@gnosis.pm/safe-apps-react-sdk';
import Layout from '@lib/common/Layout';
import {WithFonts} from '@lib/common/WithFonts';
import {IndexedDB} from '@lib/contexts/useIndexedDB';
import {WithPopularTokens} from '@lib/contexts/usePopularTokens';
import {WithPrices} from '@lib/contexts/usePrices';
import {
	IconAppAddressBook,
	IconAppDisperse,
	IconAppEarn,
	IconAppRevoke,
	IconAppSend,
	IconAppStream,
	IconAppSwap
} from '@lib/icons/IconApps';
import {IconCheck} from '@lib/icons/IconCheck';
import {IconCircleCross} from '@lib/icons/IconCircleCross';
import {IconClone} from '@lib/icons/IconClone';
import IconMultisafe from '@lib/icons/IconMultisafe';
import IconSquarePlus from '@lib/icons/IconSquarePlus';
import {IconWallet} from '@lib/icons/IconWallet';
import {supportedNetworks, supportedTestNetworks} from '@lib/utils/tools.chains';

import type {AppProps} from 'next/app';
import type {ReactElement} from 'react';

import '../style.css';

const MENU = [
	{
		href: '/apps/wallet',
		label: 'Wallet',
		icon: <IconWallet />
	},
	{
		href: '/apps/send',
		label: 'Send',
		icon: <IconAppSend />
	},
	{
		href: '/apps/disperse',
		label: 'Disperse',
		icon: <IconAppDisperse />
	},
	{
		href: '/apps/swap',
		label: 'Swap/Bridge',
		icon: <IconAppSwap />
	},

	{
		href: '/apps/address-book',
		label: 'Address Book',
		icon: <IconAppAddressBook />
	},
	{
		href: '/apps/revoke',
		label: 'Revoke',
		icon: <IconAppRevoke />
	},
	{
		href: '/apps/multisafe',
		label: 'Multisafe',
		icon: <IconMultisafe />,
		subMenu: [
			{
				href: '/apps/multisafe/new-safe',
				label: 'Create a Safe',
				icon: <IconSquarePlus />
			},
			{
				href: '/apps/multisafe/clone-safe',
				label: 'Clone a Safe',
				icon: <IconClone />
			}
		]
	},
	{
		href: '/apps/earn',
		label: 'Earn',
		isDisabled: true,
		icon: <IconAppEarn />
	},
	{
		href: '/apps/stream',
		label: 'Stream',
		isDisabled: true,
		icon: <IconAppStream />
	}
];

function MyApp(props: AppProps): ReactElement {
	return (
		<WithFonts>
			<IndexedDB>
				<WithMom
					supportedChains={[...supportedNetworks, ...supportedTestNetworks]}
					tokenLists={[
						'https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/tokenlistooor.json',
						'https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/defillama.json'
					]}>
					<WalletContextApp
						shouldWorkOnTestnet={
							process.env.NODE_ENV === 'development' && Boolean(process.env.SHOULD_USE_FORKNET)
						}>
						<WithPopularTokens>
							<WithPrices supportedNetworks={supportedNetworks}>
								<SafeProvider>
									<PlausibleProvider
										domain={process.env.PLAUSIBLE_DOMAIN || 'smold.app'}
										enabled={true}>
										<main className={'h-app flex flex-col'}>
											<Layout
												{...props}
												menu={MENU}
											/>
										</main>
									</PlausibleProvider>
								</SafeProvider>
							</WithPrices>
						</WithPopularTokens>
					</WalletContextApp>
				</WithMom>
			</IndexedDB>
			<Toaster
				toastOptions={{
					duration: 5_000,
					className: 'toast',
					success: {
						icon: <IconCheck className={'-mr-1 size-5 min-h-5 min-w-5 pt-1.5'} />,
						iconTheme: {
							primary: 'black',
							secondary: '#F1EBD9'
						}
					},
					error: {
						icon: <IconCircleCross className={'-mr-1 size-5 min-h-5 min-w-5 pt-1.5'} />,
						iconTheme: {
							primary: 'black',
							secondary: '#F1EBD9'
						}
					}
				}}
				position={'top-right'}
			/>
		</WithFonts>
	);
}

export default MyApp;
