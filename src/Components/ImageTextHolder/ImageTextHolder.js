import React from 'react';
import './ImageTextHolder.css'

const ImageTextHolder = ({ onInputChange , onButtonChange }) => {

	return (
		<div >
			<p className="f3 ">This magic brain will detect faces in your picture. Give it a try!</p>
			<div className="center"> 
				<div className="pa4 br3 shadow-5 block center" >
				<input className="w-70 dib pv2 center"type='text' 
				onChange={onInputChange}></input>
				<button onClick={onButtonChange} className=" b w-30 dib pl2 link grow bg-light-green white pv2 ph3">Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageTextHolder ;