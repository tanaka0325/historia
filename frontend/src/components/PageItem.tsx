import * as React from 'react';

import {Page} from '../entities';
import {DateService} from '../services/DateService';

const displayDatetime = (utcTime: string) => {
  const d: Date = new Date(Date.parse(utcTime));
  return DateService.toLocaleDateTimeString(d);
};

interface PageItemProps {
  page: Page;
  removePage: (pageId: number) => void;
  openEditModal: () => void;
}

export const PageItem = (props: PageItemProps) => {
  return (
    <tr>
      <td>{props.page.id}</td>
      <td>
        <a href={props.page.url} target="_blank">
          {props.page.title}
        </a>
      </td>
      <td>{props.page.is_read}</td>
      <td>{props.page.note}</td>
      <td>{props.page.score}</td>
      <td>{displayDatetime(props.page.created_at)}</td>
      <td>
        <button type="button" onClick={() => props.removePage(props.page.id)}>
          remove
        </button>
        <button type="button" onClick={() => props.openEditModal()}>
          edit
        </button>
      </td>
    </tr>
  );
};
