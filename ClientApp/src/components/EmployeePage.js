import React, { Component } from 'react';
import PackageLookupForm from './PackageLookupForm';
import PackageInfo from './PackageInfo';

export default class EmployeePage extends Component {
    render() {
        return (
            <div>
                <h1>Employee Package Lookup</h1>
                <PackageLookupForm />
            </div>
        );

    }
}