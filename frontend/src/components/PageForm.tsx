import * as React from 'react';
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik';

interface FormValues {
  url: string;
  title: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {touched, errors, isSubmitting, message} = props;
  return (
    <Form>
      <h1>{message}</h1>

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
          <Field className="input" type="text" name="title" required />
          {touched.title && errors.title && <div>{errors.title}</div>}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

interface PageFormProps {
  initialUrl?: string;
  initialTitle?: string;
  message: string;
}

export const PageForm = withFormik<PageFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      url: props.initialUrl || '',
      title: props.initialTitle || '',
    };
  },

  handleSubmit: values => {
    console.log(values);
  },
})(InnerForm);
