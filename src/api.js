import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies and check if submit is empty */
  static async getAllCompanies(name) {
    if(name === ""){
      name = undefined;
    }
    let res = await this.request("companies", {name})
    return res.companies;
  }

  /** Get list of jobs and check if submit is empty */
  static async getAllJobs(title) {
    if(title === ""){
      title = undefined;
    }
    let res = await this.request("jobs", {title});
    return res.jobs;
  }

  /** Apply to a job, no data needed */
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }


  /** Get the current user. */
  static async getCurrUser(username) {
    let res = await this.request(`users/${username}`);
    console.log(res.user)
    return res.user;
  }

  /** Login user and get token. */
  static async getLogin(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup user */
  static async getSignup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    console.log(data)
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;