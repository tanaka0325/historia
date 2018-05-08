import * as React from 'react';
import axios from 'axios';

import {Page} from '../entities';
import {PageItem} from './PageItem';
import {PageForm} from './PageForm';
import {Modal} from './Modal';
import {ApiService} from '../services/ApiService';

const API_URL = 'http://localhost:5000/pages';

interface PageListState {
  pages: Page[];
  isModal: boolean;
}

export class PageList extends React.Component<{}, PageListState> {
  private CancelToken: any;
  private source: any;
  private apiService: any = new ApiService(API_URL);

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
    this.apiService.cancel();
  }

  getPage() {
    this.apiService.get((res: any) => {
      this.setState({
        pages: res.data.pages,
      });
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
      <PageForm key="pageform" />,
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
