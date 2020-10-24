// import axios from 'axios';

export default {

    async login({commit}, login) {
        console.log("login: ",login)
        return await axios({
          method: "POST",
          url: `${this.$axios.defaults.baseURL}/new/login`,
          headers: {"Content-Type": "application/json"},
          data: { ...login.user },
        })
        .then(result => {
          console.log("result", result)
          commit("login", result);
          return result.data;
        })
         
      },
}