import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
  Alert,
} from "@mui/material";
import { Form } from "antd";

function ForgotPassword() {
  const [form] = Form.useForm();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onFinish = async (values) => {
    try {
      setMessage("");
      setError("");
      await resetPassword(values.email);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "92vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "none",
        py: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" align="center" mb={4}>
              Password Reset
            </Typography>
            {error && (
              <Alert
                severity="error"
                onClose={() => setError("")}
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            )}
            {message && (
              <Alert
                severity="success"
                onClose={() => setMessage("")}
                sx={{ mb: 2 }}
              >
                {message}
              </Alert>
            )}
            <Form
              form={form}
              name="forgot-password"
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
                <TextField fullWidth label="Email address" variant="outlined" />
              </Form.Item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Reset Password
              </Button>
            </Form>
            <Box mt={2} textAlign="center">
              <Link to="/login" style={{ textDecoration: "none" }}>
                Back to Login
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
