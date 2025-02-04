import {type ReactElement} from 'react';
import {isZeroAddress} from '@builtbymom/web3/utils';
import {Earn} from '@gimmmeSections/Earn';
import {EarnContextApp} from '@gimmmeSections/Earn/useEarnFlow';

import {BalancesModalContextApp} from '../contexts/useBalancesModal';
import {SolverContextApp} from '../contexts/useSolver';

import type {TToken} from '@builtbymom/web3/types';

function EarnPage(): ReactElement {
	return (
		<EarnContextApp>
			{({configuration}) => (
				<SolverContextApp>
					<BalancesModalContextApp
						selectedTokens={
							!isZeroAddress(configuration.asset.token?.address)
								? [configuration.asset.token as TToken]
								: []
						}>
						<Earn />
					</BalancesModalContextApp>
				</SolverContextApp>
			)}
		</EarnContextApp>
	);
}

export default EarnPage;
