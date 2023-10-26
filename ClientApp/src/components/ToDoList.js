import React, { Component } from 'react';

export class ToDoList extends Component {
  static displayName = ToDoList.name;

  constructor(props) {
    super(props);
    this.state = { ToDoListItems: [], loading: true };
  }

  componentDidMount() {
    this.populateListData();
  }

  static renderListTable(ToDoListItems) {
	console.log(ToDoListItems);
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {ToDoListItems.map(item =>
            <tr key={item.id}>
				<td>{item.dueDate}</td>
				<td>{item.item}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ToDoList.renderListTable(this.state.ToDoListItems);

    return (
      <div>
        <h1 id="tableLabel">Todo list</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateListData() {
    const response = await fetch('todolist');
    const data = await response.json();
    this.setState({ ToDoListItems: data, loading: false });
  }
}
