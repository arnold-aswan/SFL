import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/Context";

const Members = () => {
  const { getAllMembers } = useContext(AppContext);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await getAllMembers();
        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMembers();
  }, [getAllMembers]);

  return (
    <div className="flex flex-col items-center  mt-10 py-5 px-2 overflow-x-auto max-w-4xl mx-auto ">
      <h2 className="text-3xl font-bold mb-4">All Members</h2>

      <table className="w-full text-gray-500 rounded-lg shadow-lg table-auto mx-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="font-bold">
            <th scope="col" className="px-4 py-2">
              ID
            </th>
            <th scope="col" className="px-4 py-2">
              First Name
            </th>
            <th scope="col" className="px-4 py-2">
              Middle Name
            </th>
            <th scope="col" className="px-4 py-2">
              Last Name
            </th>
            <th scope="col" className="px-4 py-2">
              ID Number
            </th>
            <th scope="col" className="px-4 py-2">
              Date of Birth
            </th>
            <th scope="col" className="px-4 py-2">
              Photo
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200 capitalize">
          {members.map((member) => (
            <tr
              key={member.id}
              className="text-sm odd:bg-gray-300 even:bg-gray-50 border-b  hover:bg-gray-400"
            >
              <td className="px-4 py-2">{member.id}</td>
              <td className="px-4 py-2">{member.firstName}</td>
              <td className="px-4 py-2">{member.middleName}</td>
              <td className="px-4 py-2">{member.lastName}</td>
              <td className="px-4 py-2">{member.idNumber}</td>
              <td className="px-4 py-2">{member.dateOfBirth}</td>
              <td className="px-4 py-2">
                {member.photo && (
                  <img
                    src={`http://localhost:5000/${member.photo}`}
                    alt={`Photo of ${member.firstName}`}
                    loading="lazy"
                    className="size-10 rounded-full object-cover"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
