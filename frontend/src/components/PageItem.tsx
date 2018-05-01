import * as React from 'react';

import {Page} from './frontend/src/entities/Page.ts';

export const PageItem = (props: Page) => {
  return (
    <tr>
      <td>{props.page.id}</td>
      <td>{props.page.url}</td>
      <td>{props.page.title}</td>
      <td>{props.page.is_read}</td>
      <td>{props.page.note}</td>
      <td>{props.page.score}</td>
      <td>{props.page.created_at}</td>
      <td>page.action</td>
    </tr>
  );
};
