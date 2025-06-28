import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/registerSlice";
import { User } from "../../types/user"; // Assuming you have a User model defined

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: { email: string; password: string }) => {
    // Simulate a registration API call
    const user:User = { id: "1", name: "New User", email: values.email }; // Replace with actual user creation logic

    // Dispatch the register action
    dispatch(register({ ...user, createdAt: new Date().toISOString() }));

    // Redirect to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="firstName" label="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;