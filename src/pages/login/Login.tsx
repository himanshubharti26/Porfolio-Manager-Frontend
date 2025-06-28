import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: { email: string; password: string }) => {
    // Simulate a login API call
    const user = { id: "1", name: "John Doe", email: values.email };
    const token = "fake-jwt-token";

    // Dispatch the login action
    dispatch(login({ user, token }));

    // Redirect to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;