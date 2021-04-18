import axios from 'axios';

const API_URL = 'http://rest-api:8085/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        login: user.login,
        password: user.password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log(JSON.stringify(response.data))
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
