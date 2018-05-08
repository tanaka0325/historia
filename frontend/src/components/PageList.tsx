import * as React from 'react';
import axios from 'axios';

import {Page} from '../entities';
import {PageItem} from './PageItem';
import {PageForm} from './PageForm';
import {Modal} from './Modal';
import {PageApiService} from '../services/PageApiService';

interface PageListState {
  pages: Page[];
  isModal: boolean;
}

export class PageList extends React.Component<{}, PageListState> {
  private pageApiService: any = new PageApiService();

  constructor(props: {}) {
    super(props);
    this.state = {
      pages: [],
      isModal: false,
    };
  }

  componentDidMount() {
    this.getPage();
  }

  componentWillUnmount() {
    this.pageApiService.cancel();
  }

  getPage() {
    this.pageApiService.get((res: any) => {
      this.setState({
        pages: res.data.pages,
      });
    });
  }

  removePage = (pageId: number) => {
    this.pageApiService.delete(pageId, (res: any) => {
      if (res.status == 204) {
        this.setState({
          pages: this.state.pages.filter(page => page.id != pageId),
        });
      } else {
        console.log('delete error');
      }
    });
  };

  toggleModal = () => {
    this.setState({
      isModal: !this.state.isModal,
    });
  };

  updateList = () => {
    this.getPage();
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
      <PageForm key="pageform" updateList={this.updateList} />,
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
