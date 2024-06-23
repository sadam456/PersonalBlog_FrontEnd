import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { googleProvider } from "../../utils/firebaseConfig";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import Lottie from "react-lottie-player";
import animationregister from "../../assets/Register.json";
import AgreementModal from "../../components/AggrementModal/AggrementModal";
import { Form, Checkbox } from "antd";
import PasswordInput from "./PasswordInput"; // Import the custom PasswordInput component
import "./Register.css"; // Ensure this imports your custom styles

function Register() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { register, socialLogin } = useAuth();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onFinish = async (values) => {
    const { email, password, user } = values;
    try {
      const newUser = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      await register(email, password, newUser);
      navigate("/profile"); // Redirect to profile or any other page
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await socialLogin(googleProvider);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <MDBContainer fluid className="p-4 h-custom1">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <Lottie
            loop
            animationData={animationregister}
            play
            className="lottie-animation"
          />
        </MDBCol>
        <MDBCol md="6">
          <MDBCard className="my-5 shadow-5">
            <MDBCardBody className="p-5 d-flex flex-column align-items-center">
              <Form
                form={form}
                name="dependencies"
                autoComplete="off"
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
                layout="vertical"
              >
                <MDBRow>
                  <MDBCol md="6">
                    <Form.Item
                      name={["user", "firstName"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <MDBInput
                        wrapperClass="mb-2"
                        label="First name"
                        type="text"
                      />
                    </Form.Item>
                  </MDBCol>

                  <MDBCol md="6">
                    <Form.Item
                      name={["user", "lastName"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <MDBInput
                        wrapperClass="mb-3"
                        label="Last name"
                        type="text"
                      />
                    </Form.Item>
                  </MDBCol>
                </MDBRow>
                <Form.Item
                  name={["user", "username"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <MDBInput
                    wrapperClass="w-100 mb-3"
                    label="Username"
                    type="text"
                  />
                </Form.Item>
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
                    wrapperClass="w-100 mb-3"
                    label="Email"
                    type="email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <PasswordInput wrapperClass="mb-3" label="Password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <PasswordInput wrapperClass="mb-2" label="Confirm Password" />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    <span>
                      I have read the{" "}
                      <button
                        onClick={openModal}
                        style={{ color: "red", textDecoration: "underline" }}
                      >
                        Agreement
                      </button>
                      <AgreementModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                      />
                    </span>
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <MDBBtn className="wide-btn  mb-3" size="md" type="submit">
                    Sign up
                  </MDBBtn>
                </Form.Item>
              </Form>

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn floating size="md" tag="a" className="me-2 btn-social">
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className="me-2 btn-social">
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  floating
                  size="md"
                  tag="a"
                  className="me-2 btn-social"
                  onClick={handleGoogleSignIn}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className="me-2 btn-social">
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <Link to="/login" className="link-danger">
                  Login
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
