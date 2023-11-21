import { useState } from 'react';

export default function useAuthentication() {
  const getAuthentication = () => {
    const authenticationString = sessionStorage.getItem('authenticationItems');
    const userAuthItems = JSON.parse(authenticationString);
    return userAuthItems;
  };
  
  const getUser = () => {
	const authenticationString = sessionStorage.getItem('authenticationItems');
	const userAuthItems = JSON.parse(authenticationString);
	return userAuthItems?.currentUser;
  }

  const getRole = () => {
	const authenticationString = sessionStorage.getItem('authenticationItems');
	const userAuthItems = JSON.parse(authenticationString);
	return userAuthItems?.role;
  }

  const getToken = () => {
	const authenticationString = sessionStorage.getItem('authenticationItems');
	const userAuthItems = JSON.parse(authenticationString);
	return userAuthItems?.token;
  }

  const [authentication, setAuthentication] = useState(getAuthentication());

  const saveAuthentication = userAuthItems => {
	if (userAuthItems != null) {
		sessionStorage.setItem('authenticationItems', JSON.stringify(userAuthItems));
	}
    setAuthentication(userAuthItems);
  };

  return {
    setAuthentication: saveAuthentication,
	// getUser: getUser,
	// getRole: getRole,
	// getToken: getToken,
    authentication
  }
}