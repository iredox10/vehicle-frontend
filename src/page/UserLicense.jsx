import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import coatOfArm from '../assets/coat_of_arm.png'

const UserLicense = () => {
    const [user, setUser] = useState(null)
    const {id} = useParams()
    useEffect(() => {
      const fetch = async () => {
        try {
          const user = await axios(
            `https://vehicle-backend-1.onrender.com/admin-user/${id}` ||
            `http://localhost:3003/admin-user/${id}`
          );
          console.log(user.data);
          setUser(user.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetch();
    }, []);
  return (
    <div>
      {user && (
        <div className="w-1/3 mx-auto border rounded my-[10%] p-2">
          <div className="flex gap-5">
            <img src={coatOfArm} alt="nigeria flag" className="w-16" />
            <h1 className="text-green-600 font-bold uppercase">
              federal republic of Nigeria <span>National Drivers license</span>
            </h1>
          </div>
          <div>
            <p className="bg-blue-800 text-white text-center capitalize p-1 my-2">
              {user.licenseType}
            </p>
          </div>
          <div>
            <h1 className="flex justify-between uppercase text-blue-800 text-4xl font-bold">
              <span>{user.ownerName} </span>
              <span className='text-xl'>{user.plateNumber} </span>
            </h1>
            <div className="capitalize">
              <p className="">
                <span className="font-bold text-green-600">
                  chasis Number:{" "}
                </span>
                {user.chasisNumber}
              </p>
              <div>
                <p className="">
                  <span className="font-bold text-green-600">issue Date: </span>
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(user.issueDate)
                  )}
                </p>
                <p className="">
                  <span className="font-bold text-green-600">
                    expired Date:{" "}
                  </span>
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(user.expiredDate)
                  )}
                </p>
              </div>
            </div>
            <p className="">
              <span className="font-bold text-green-600">address: </span>
              {user.address}
            </p>
            <p className="">
              <span className="font-bold text-green-600">phone Number: </span>
              {user.phoneNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLicense