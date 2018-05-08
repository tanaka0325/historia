import axios from 'axios';

export class PageApiService {
  private CancelToken: any;
  private source: any;
  private baseUrl = 'http://localhost:5000/pages';

  constructor() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  getAxiosConfig() {
    return {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      cancelToken: this.source.token,
    };
  }

  get(successHandler: any) {
    return axios
      .get(this.baseUrl, {cancelToken: this.source.token})
      .then((res: any) => successHandler(res))
      .catch((err: any) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled.', err.message);
        } else {
          console.log(err);
        }
      });
  }

  delete(pageId: number, successHandler: any) {
    return axios
      .delete(`${this.baseUrl}/${pageId}`, this.getAxiosConfig())
      .then((res: any) => successHandler(res))
      .catch((err: any) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled.', err.message);
        } else {
          console.log(err);
        }
      });
  }

  post(values: object, successHandler: any) {
    return axios
      .post(this.baseUrl, values, this.getAxiosConfig())
      .then((res: any) => successHandler(res))
      .catch((err: any) => console.log(err));
  }

  cancel() {
    this.source.cancel('canceled');
  }
}
