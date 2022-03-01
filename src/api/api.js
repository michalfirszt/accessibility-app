import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

axios.defaults.adapter = adapter;

export class API {
  constructor(url) {
    this.url = url;
  }

  withPath(path) {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    return `${this.url}${path}`;
  }

  async getAllPosts() {
    return axios
      .get(this.withPath('/posts'), {
        headers: {
          Authorization: 'token',
        },
      })
      .then((response) => response.data);
  }

  async getPost(id) {
    return axios
      .get(this.withPath('/posts/' + id), {
        headers: {
          Authorization: 'token',
        },
      })
      .then((response) => response.data);
  }
}

export default new API('http://localhost/');
