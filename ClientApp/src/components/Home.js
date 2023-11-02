import React, { Component } from 'react';
import CreatePackage from './Package/CreatePackage';

export class Home extends Component {
  static displayName = Home.name;

render() {
	return (
		<div>
			<CreatePackage />

		</div>
	);
	}
}
