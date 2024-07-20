import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  Tile,
} from "carbon-components-react";
import { AppContext } from "../context/Context";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      console.log(formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <Tile className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <Form onSubmit={handleRegister}>
            <FormGroup legendText="" className="space-y-4">
              <TextInput
                id="username"
                labelText="Username"
                className="w-full border-b "
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              <TextInput.PasswordInput
                id="password"
                labelText="Password"
                className="mb-4"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </FormGroup>
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white font-medium rounded-lg py-2 hover:bg-blue-700"
            >
              Submit
            </Button>
            <p className="text-sm">
              Already have an account?{" "}
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </p>
          </Form>
        </Tile>
      </div>
    </div>
  );
};

export default Register;
