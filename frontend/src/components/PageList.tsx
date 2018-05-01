import * as React from 'react';
import * as axios from 'axios';

import {PageItem} from './PageItem';
import {Modal} from './Modal';

const API_URL = 'http://localhost:5000/pages';

export class PageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      isModal: false,
    };
  }

  componentDidMount() {
    this.getPage();
  }

  getPage() {
    axios.get(API_URL).then(res => {
      this.setState({
        pages: res.data.pages,
      });
    });
  }

  removePage = (pageId: number) => {
    axios.delete(`${API_URL}/${pageId}`).then(res => {
      if (res.status == 204) {
        this.setState({
          pages: this.state.pages.filter(page => page.id != pageId),
        });
      } else {
        console.log('error');
      }
    });
  };

  toggleModal = () => {
    this.setState({
      isModal: !this.state.isModal,
    });
  };

  render() {
    const pages = this.state.pages.map(page => {
      return (
        <PageItem
          key={page.id}
          openEditModal={this.toggleModal}
          page={page}
          removePage={this.removePage}
        />
      );
    });
    return [
      <table key="PageListTable" className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>is_read</th>
            <th>note</th>
            <th>score</th>
            <th>created_at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{pages}</tbody>
      </table>,
      <Modal
        key="PageListModal"
        isActive={this.state.isModal}
        closeModal={this.toggleModal}
      />,
    ];
  }
}
