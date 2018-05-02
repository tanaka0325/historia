import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {PageList} from '../src/components/PageList';

storiesOf('Page', module).add('PageList', () => <PageList />);
