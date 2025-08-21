import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    
    try {
      return Axios.post(`/assessments`, assessment)
        .then((response) => response.data);
    } catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    
    try {
      return Axios.get(`/assessments`, {
        params: {
          // TODO: Add any query parameters here for filtering, pagination, etc.
        },
      })
        .then((response) => response.data.data.assessments);
    } catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  // Fetch the list of assessments from the API
  static getListFromApi() {
    try {
      return Axios.get(`/api/assessments/list`)
        .then((response) => response.data);
    } catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

}
