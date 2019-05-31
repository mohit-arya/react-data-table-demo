import React, { Component } from 'react';
import DataTable from 'data-table';
import { GET_POSTS_URL } from './constants';

export default class App extends Component {

  state = {
    posts: [],
    page: 1,
    pages: 0
  }

  componentDidMount() {
    this.fetchPosts();
  }

  async fetchPosts() {
    const rawResponse = await fetch(GET_POSTS_URL);
    const res = await rawResponse.json();
    this.setState({
      posts: res,
      pages: Math.ceil(res.length / 10)
    });
  }

  getColumns() {
    const columns = [
      {
        header: "ID",
        accessor: "id",
        width: "5%",
        cell: data => <strong>{data.id}</strong>,
      },
      {
        header: "User ID",
        width: "5%",
        accessor: "userId"
      },
      {
        header: "Title",
        accessor: "title",
        sortable: true
      },
      {
        header: "Body",
        accessor: "body",
        sortable: true
      }
    ]
    return columns;
  }

  getActions() {
    return [
      {
        name: "Add",
        className: "btn-primary",
        onClick: () => console.log("Add Action Clicked")
      },
      {
        name: "Export",
        className: "btn-primary",
        onClick: () => console.log("Export Action Clicked")
      }
    ];
  }

  render() {
    return (
      <div className="container">
        <DataTable
          data={this.state.posts}
          columns={this.getColumns()}
          page={this.state.page - 1}
          pages={this.state.pages}
          defaultPageSize={10}
          totalRows={this.state.posts.length}
          manual={false}
          onFetchData={this.manualFetchData}
          className="table-bordered"
          onCellClick={({ accessor, cellData, rowData }) => { console.log(accessor, cellData, rowData) }}
          onRowClick={({ index, data }) => { console.log(index, data) }}
          onSortChange={({ sortBy, order }) => console.log(sortBy, order)}
          title="Table Title"
          onSearch={(searchText) => console.log(searchText)}
          actions={this.getActions()}
        />
      </div>
    )
  }
}


