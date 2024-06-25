import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { googleProvider } from "../../utils/firebaseConfig";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Facebook, Twitter, Google, GitHub } from "@mui/icons-material";
import Lottie from "react-lottie-player";
import animationregister from "../../assets/Register.json";
import AgreementModal from "../../components/AggrementModal/AggrementModal";
import { Form } from "antd";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Register.css";

function Register() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { register, socialLogin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

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
      navigate("/profile");
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

  return (
    <Container maxWidth="lg" className="h-custom1">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Lottie
              loop
              animationData={animationregister}
              play
              style={{ width: "100%", height: "500px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="my-5 shadow-5">
            <CardContent className="p-5">
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                layout="vertical"
                style={{ width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Form.Item
                      name={["user", "firstName"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <TextField
                        fullWidth
                        label="First name"
                        variant="outlined"
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item
                      name={["user", "lastName"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <TextField
                        fullWidth
                        label="Last name"
                        variant="outlined"
                      />
                    </Form.Item>
                  </Grid>
                </Grid>
                <Form.Item
                  name={["user", "username"]}
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <TextField fullWidth label="Username" variant="outlined" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Please input your E-mail!" },
                  ]}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
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
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <span>
                        I have read the
                        <Button
                          onClick={openModal}
                          style={{ color: "red", textDecoration: "underline" }}
                        >
                          Agreement
                        </Button>
                      </span>
                    }
                  />
                </Form.Item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Sign up
                </Button>
              </Form>
              <AgreementModal isOpen={isModalOpen} onClose={closeModal} />
              <Box textAlign="center" mt={2}>
                <Typography variant="body1">or sign up with:</Typography>
                <Box display="flex" justifyContent="center" mt={1}>
                  <IconButton className="btn-social">
                    <Facebook />
                  </IconButton>
                  <IconButton className="btn-social">
                    <Twitter />
                  </IconButton>
                  <IconButton
                    className="btn-social"
                    onClick={handleGoogleSignIn}
                  >
                    <Google />
                  </IconButton>
                  <IconButton className="btn-social">
                    <GitHub />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" align="center" mt={2}>
                Already have an account?{" "}
                <Link to="/login" className="link-danger">
                  Login
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
