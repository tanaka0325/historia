import * as React from 'react';

import {Page} from '../entities/Page';
import {DateService} from '../services/DateService.ts';

const displayDatetime = utcTime => {
  const d = new Date(Date.parse(utcTime));
  return DateService.toLocaleDateTimeString(d);
};

export const PageItem = (props: Page) => {
  return (
    <tr>
      <td>{props.page.id}</td>
      <td>{props.page.url}</td>
      <td>{props.page.title}</td>
      <td>{props.page.is_read}</td>
      <td>{props.page.note}</td>
      <td>{props.page.score}</td>
      <td>{displayDatetime(props.page.created_at)}</td>
      <td>page.action</td>
    </tr>
  );
};
