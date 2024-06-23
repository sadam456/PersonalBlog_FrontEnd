import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Form } from "antd";
import Lottie from "react-lottie-player";
import animationlogin from "../../assets/Login.json";
import PasswordInput from "../Register/PasswordInput";
import { googleProvider } from "../../utils/firebaseConfig";
import "./Login.css"; // Ensure this imports your custom styles

function App() {
  const [form] = Form.useForm();
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const user = await login(email, password);
      console.log("Logged in user ID: ", user.uid);
      navigate("/profile"); // Redirect to dashboard or any other page
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const user = await socialLogin(provider);
      console.log("Logged in user ID: ", user.uid);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6" className="d-flex align-items-center">
          <Lottie
            loop
            animationData={animationlogin}
            play
            className="lottie-animation"
          />
        </MDBCol>
        <MDBCol col="4" md="6">
          <MDBCard className="shadow-5">
            <MDBCardBody className="p-5 d-flex flex-column align-items-center">
              <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <div className="d-flex justify-content-center">
                  <MDBBtn
                    floating
                    size="md"
                    tag="a"
                    className="me-2 btn-social"
                  >
                    <MDBIcon fab icon="facebook-f" />
                  </MDBBtn>

                  <MDBBtn
                    floating
                    size="md"
                    tag="a"
                    className="me-2 btn-social"
                  >
                    <MDBIcon fab icon="twitter" />
                  </MDBBtn>

                  <MDBBtn
                    floating
                    size="md"
                    tag="a"
                    className="me-2 btn-social"
                    onClick={() => handleSocialLogin(googleProvider)}
                  >
                    <MDBIcon fab icon="google" />
                  </MDBBtn>
                </div>
                <div className="divider d-flex  my-4">
                  <p className="text-center fw-bold mb-0">Or</p>
                </div>
              </div>
              <Form
                form={form}
                name="dependencies"
                autoComplete="off"
                onFinish={onFinish}
                layout="vertical"
                className="w-100" // Ensure the form takes full width
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <MDBInput
                    wrapperClass="mb-3 form-input" // Add a custom class for responsive width
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="md"
                    required
                  />
                </Form.Item>
                <Form.Item name="password">
                  <PasswordInput
                    wrapperClass="mb-3 form-input" // Add a custom class for responsive width
                    label="Password"
                    id="form1"
                    required
                  />
                </Form.Item>

                <div className="d-flex justify-content-between mb-4 w-100">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                  <a href="#!">Forgot password?</a>
                </div>

                <MDBBtn
                  className="mb-1 px-5"
                  size="lg"
                  style={{ width: "100%" }}
                >
                  Login
                </MDBBtn>
              </Form>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <Link to="/register" className="link-danger">
                  Register
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
