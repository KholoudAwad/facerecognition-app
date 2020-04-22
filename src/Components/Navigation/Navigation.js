import React from 'react';

const Navigation = ({onRouteChange , isSignedIn}) => {
	if(isSignedIn){

	return (
		<div style={{display: 'flex' , justifyContent: 'flex-end' }}>
		<p  onClick={()=>onRouteChange('signout')} className="pointer f4 tr link dim black pa3 pr3 underline">Sign Out</p>
		</div>
	);

	}
	else {

		return (
		<div style={{display: 'flex' , justifyContent: 'flex-end' }}>
		<p  onClick={()=>onRouteChange('signin')} className="pointer f4 tr link dim black pa3 pr3 underline">Sign in</p>
		<p  onClick={()=>onRouteChange('register')} className="pointer f4 tr link dim black pa3 pr3 underline">Register</p>
		</div>
	);
	}
}

export default Navigation ;