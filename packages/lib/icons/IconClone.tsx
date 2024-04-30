import React from 'react';

import type {ReactElement} from 'react';

export function IconClone(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			{...props}
			viewBox={'0 0 512 512'}
			fill={'none'}
			xmlns={'http://www.w3.org/2000/svg'}
			height={'1em'}>
			<path
				d={
					'M64 480H288c17.7 0 32-14.3 32-32V384h32v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h64v32H64c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32zM224 320H448c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H224c-17.7 0-32 14.3-32 32V288c0 17.7 14.3 32 32 32zm-64-32V64c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V288c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64z'
				}
				fill={'currentColor'}
			/>
		</svg>
	);
}
