import axios from "axios";

export class ApiService {
  private CancelToken: any;
  private source: any;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    this.baseUrl = baseUrl;
  }

  get(successHandler: any) {
    return axios
      .get(this.baseUrl, { cancelToken: this.source.token })
      .then((res: any) => successHandler(res))
      .catch((err: any) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled.", err.message);
        } else {
          console.log(err);
        }
      });
  }

  cancel() {
    this.source.cancel("canceled");
  }
}
