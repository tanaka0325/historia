import * as React from 'react';
import axios from 'axios';

import {Page} from '../entities';
import {PageItem} from './PageItem';
import {Modal} from './Modal';

const API_URL = 'http://localhost:5000/pages';

interface PageListState {
  pages: Page[];
  isModal: boolean;
}

export class PageList extends React.Component<{}, PageListState> {
  private CancelToken: any;
  private source: any;

  constructor(props: {}) {
    super(props);

    this.state = {
      pages: [],
      isModal: false,
    };

    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount() {
    this.getPage();
  }

  componentWillUnmount() {
    this.source.cancel('canceled');
  }

  getPage() {
    axios
      .get(API_URL, {cancelToken: this.source.token})
      .then((res: any) => {
        this.setState({
          pages: res.data.pages,
        });
      })
      .catch((err: any) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled.', err.message);
        } else {
          console.log(err);
        }
      });
  }

  removePage = (pageId: number) => {
    axios
      .delete(`${API_URL}/${pageId}`, {cancelToken: this.source.token})
      .then((res: any) => {
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
