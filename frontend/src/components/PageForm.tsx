import * as React from 'react';
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik';
import axios from 'axios';

import {PageApiService} from '../services/PageApiService';

interface FormValues {
  url: string;
  title: string;
  isRead: boolean;
  note: string;
  score: number;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const {touched, errors, isSubmitting} = props;
  return (
    <Form>
      <div className="field">
        <label className="label">URL</label>
        <div className="control">
          <Field className="input" type="url" name="url" required />
          {touched.url && errors.url && <div>{errors.url}</div>}
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <Field className="input" type="text" name="title" />
          {touched.title && errors.title && <div>{errors.title}</div>}
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <Field type="checkbox" name="isRead" />
            isRead
            {touched.isRead && errors.isRead && <div>{errors.isRead}</div>}
          </label>
        </div>
      </div>

      <div className="field">
        <label className="label">Note</label>
        <div className="control">
          <Field className="textarea" component="textarea" name="note" />
          {touched.note && errors.note && <div>{errors.note}</div>}
        </div>
      </div>

      <div className="field">
        <label className="label">Score</label>
        <div className="control">
          <Field
            className="input"
            type="number"
            name="score"
            min="0"
            max="100"
          />
          {touched.score && errors.score && <div>{errors.score}</div>}
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-link"
            type="submit"
            disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
};

interface PageFormProps {
  initialUrl?: string;
  initialTitle?: string;
  initialIsRead?: boolean;
  initialNote?: string;
  initialScore?: number;
  updateList: any;
}

export const PageForm = withFormik<PageFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      url: props.initialUrl || '',
      title: props.initialTitle || '',
      isRead: props.initialIsRead || false,
      note: props.initialNote || '',
      score: props.initialScore || 0,
    };
  },

  handleSubmit: (values, {props, setSubmitting}) => {
    const pageApiService: any = new PageApiService();
    pageApiService.post(values, (res: any) => {
      setSubmitting(false);
      props.updateList();
    });
  },
})(InnerForm);
