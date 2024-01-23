import axios from 'axios'
import coatOfArm from "../../src/assets/coat_of_arm.png";
import jigawa_logo from "../../src/assets/jigawa_logo.png";
import FormInput from '../components/FormInput'
import { useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { path } from '../../utils/path';

const Login = () => {
  const [chasisNumber, setChasisNumber] = useState("");
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://vehicle-backend.onrender.com/login`,
        {
          chasisNumber,
        }
      );
      const user = res.data
      console.log(user)
      navigate('/user-dashboard', {state: user})
      
    } catch (err) {
      console.log(err);
    }
  };

  // chasisNumber sampel:6778dfq
  return (
    <div className="grid grid-cols-6 w-full min-h-screen ">
      <section className="bg-green-700 col-start-1 col-end-3 p-2">
        <div>
          <div className="flex items-center justify-between">
            <div className="w-[20%]">
              <img src={coatOfArm} alt="Nigeria coat of arm" />
            </div>
            <div className="w-[20%]">
              <img src={jigawa_logo} alt="Jigawa State Logo" />
            </div>
          </div>

          <div className="text-center text-white capitalize">
            <h1 className="text-5xl font-black my-5 ">
              jigawa State Internal Revenue Service (JIRS)
            </h1>
            <h2 className="text-2xl font-black">Vehicle License</h2>
            <p>valid for 12 (Months) from Date of Issue </p>
          </div>
        </div>
      </section>

      <main className="col-start-3 col-end-7 p-16  w-full">
        <div className="border border-green-700 w-[70%] mx-auto">
          <h1 className="bg-green-700 text-xl   p-2 font-bold text-white">
            Vehicle License Registration Form
          </h1>
          <form onSubmit={handleSubmit} className="p-2 capitalize">
            <div className="flex items-center gap-10">
              <FormInput
                type={"text"}
                htmlFor={"chasisNumber"}
                label={"chasis Number"}
                name={"chasisNumber"}
                onchange={(e) => setChasisNumber(e.target.value)}
              />
            </div>

            <div>
              <button className="capitalize text-xl font-bold bg-green-700 w-full p-2 text-white">
                Login
              </button>
            </div>
          </form>
          <p className='px-2'>
            Don't have account? <NavLink to={"/"} className='underline text-blue-500'>Register</NavLink>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login