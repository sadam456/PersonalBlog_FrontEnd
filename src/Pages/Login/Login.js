import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Container,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import { Facebook, Twitter, Google } from "@mui/icons-material";
import { Form } from "antd";
import Lottie from "react-lottie-player";
import animationlogin from "../../assets/Login.json";
import { googleProvider } from "../../utils/firebaseConfig";
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";

function Login() {
  const [form] = Form.useForm();
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const user = await login(email, password);
      console.log("Logged in user ID: ", user.uid);
      navigate("/");
    } catch (error) {
      console.error("Social login error:", error);
      setError(getErrorMessage(error.code));
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const user = await socialLogin(provider);
      console.log("Logged in user ID: ", user.uid);
      navigate("/");
    } catch (error) {
      console.error("Social login error:", error);
      setError(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password. Please try again.";
      case "auth/too-many-requests":
        return "Too many failed login attempts. Please try again later.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      default:
        return "An error occurred during login. Please try again.";
    }
  };

  return (
    <Container maxWidth="lg" className="p-3 my-5 h-custom">
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
              animationData={animationlogin}
              play
              style={{ width: "100%", maxHeight: "500px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="shadow-5">
            <CardContent className="p-5">
              {error && (
                <Alert
                  severity="error"
                  onClose={() => setError("")}
                  sx={{ mb: 2 }}
                >
                  {error}
                </Alert>
              )}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={4}
              >
                <Typography variant="h6" mb={2}>
                  Sign in with
                </Typography>
                <Box display="flex" justifyContent="center">
                  <IconButton className="btn-social">
                    <Facebook />
                  </IconButton>
                  <IconButton className="btn-social">
                    <Twitter />
                  </IconButton>
                  <IconButton
                    className="btn-social"
                    onClick={() => handleSocialLogin(googleProvider)}
                  >
                    <Google />
                  </IconButton>
                </Box>
                <Divider style={{ width: "100%", margin: "20px 0" }}>
                  <Typography variant="body2">Or</Typography>
                </Divider>
              </Box>

              <Form
                form={form}
                name="login"
                onFinish={onFinish}
                layout="vertical"
                style={{ width: "100%" }}
              >
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
                    label="Email address"
                    variant="outlined"
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
                <Grid container spacing={2} alignItems="center" mb={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Remember me"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ textAlign: isSmallScreen ? "left" : "right" }}
                  >
                    <Link to="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Login
                </Button>
              </Form>
              <Typography variant="body2" align="center" mt={2}>
                Don't have an account?{" "}
                <Link to="/register" className="link-danger">
                  Register
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
