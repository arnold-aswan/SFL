import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  Tile,
} from "carbon-components-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);

      if (response.status === 200) {
        navigate("/");
        console.log(formData, "logged in succesfully");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4 ">
        <Tile className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <Form onSubmit={handleLogin}>
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
              Dont have an account?{" "}
              <Link className="text-blue-600" to="/register">
                Register
              </Link>
            </p>
          </Form>
        </Tile>
      </div>
      {error && (
        <p className=" mt-8 rounded-lg bg-red-500 text-white text-sm p-3">
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
