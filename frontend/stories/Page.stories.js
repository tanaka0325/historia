import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {PageList} from '../src/components/PageList';
import {PageItem} from '../src/components/PageItem';

const page = {
  id: 1,
  url: 'http://example.com',
  title: 'text title',
  is_read: false,
  note: 'test note',
  score: 25,
  created_at: 'Tue, 01 May 2018 07:26:41 GMT',
};

storiesOf('Page', module)
  .add('PageList', () => <PageList />)
  .add('PageItem', () => {
    return (
      <table>
        <tbody>
          <PageItem page={page} />
        </tbody>
      </table>
    );
  });
