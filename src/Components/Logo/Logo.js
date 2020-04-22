import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {

	return (
		<div className=" ma5 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
				 <div className="Tilt-inner pt3"> <img alt='brainimage' src={brain} /> </div>
			</Tilt>
		</div>
	);
}

export default Logo ;