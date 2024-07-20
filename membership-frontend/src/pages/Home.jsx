import React, { useState, useContext } from "react";
import { Button, TextInput, Form, Tile } from "carbon-components-react";
import { AppContext } from "../context/Context";

const Home = () => {
  const { addMember } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    idNumber: "",
    dateOfBirth: "",
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("middleName", formData.middleName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("idNumber", formData.idNumber);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);
    formDataToSend.append("photo", formData.photo);

    console.log(formDataToSend);
    try {
      const response = await addMember(formDataToSend);

      if (response?.status === 201) {
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          idNumber: "",
          dateOfBirth: "",
          photo: null,
        });
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({ ...formData, photo: file });
    console.log(formData.photo, file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Tile className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Add Member</h1>
        <Form
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
          className="space-y-4"
        >
          <TextInput
            id="firstName"
            name="firstName"
            labelText="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border-b"
            required
          />
          <TextInput
            id="middleName"
            name="middleName"
            labelText="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            required
          />
          <TextInput
            id="lastName"
            name="lastName"
            labelText="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextInput
            id="idNumber"
            name="idNumber"
            labelText="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col gap-4 w-fit">
            <div className="flex flex-col w-fit">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              accept=".jpg,.png,.jpeg"
              required
            />
          </div>

          <Button
            type="submit"
            kind="primary"
            className="bg-blue-600 px-2 text-white font-medium rounded-lg py-2 hover:bg-blue-700"
          >
            Add Member
          </Button>
        </Form>
      </Tile>
      {error && (
        <p className=" mt-8 rounded-lg bg-red-500 text-white text-sm p-3">
          {error}
        </p>
      )}
    </div>
  );
};

export default Home;
