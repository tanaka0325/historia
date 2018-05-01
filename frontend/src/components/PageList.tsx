import * as React from 'react';
import * as axios from 'axios';

import {PageItem} from './PageItem';

export class PageList extends React.Component {
  state = {
    pages: [],
  };

  componentDidMount() {
    this.getPage();
  }

  getPage() {
    axios.get('http://localhost:5000/pages/').then(res => {
      this.setState({
        pages: res.data.pages,
      });
    });
  }

  render() {
    const pages = this.state.pages.map(page => {
      return <PageItem key={page.id} page={page} />;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>url</th>
            <th>title</th>
            <th>is_read</th>
            <th>note</th>
            <th>score</th>
            <th>created_at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{pages}</tbody>
      </table>
    );
  }
}
