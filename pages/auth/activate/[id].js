import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import { successAlert, errorAlert } from "../../../helpers/alert";
import { Post } from "../../../helpers/api-functions";
import Layout from "../../../components/Layout";

const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: ""
  })
  const { name, token, buttonText, success, error } = state;
  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token)
      setState({ ...state, name, token })
    }
  }, [router])

  const clickSubmit = async e => {
    e.preventDefault();
    setState({ ...state, buttonText: "Activating..." })
    try {
      const response = await Post('/register/activate', { token })
      setState({ ...state, name: "", token: "", buttonText: "Activated", success: response.data.message })
    }
    catch (error) {
      setState({ ...state, buttonText: "Activate Account", error: error.response.data.error })
    }
  }

  return <Layout>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1>Hi {name}, Ready to activate your account?</h1>
        <br />
        {success && successAlert(success)}
        {error && successAlert(error)}
        <button className="btn btn-outline-warning btn-block" onClick={clickSubmit}>{buttonText}</button>
      </div>
    </div>
  </Layout>
}
export default withRouter(ActivateAccount);