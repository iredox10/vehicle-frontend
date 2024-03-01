import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Admin = () => {
  const [users, setUsers] = useState(null)
  useEffect(()=>{
    const fetch = async ()=>{
      try {
      const res =await axios('http://localhost:3003/users'|| 'https://vehicle-backend-1.onrender.com/users')
      const users = res.data
      setUsers(users)
      console.log(users)
      } catch (err) {
      console.log(err)  
      }
    }
  fetch()
  }, [])
  return (
    <div>
      <div  className='flex items-center justify-between bg-green-500 p-10 text-white'>
        <h1 >admin page</h1>
        <div>
          <Link to={'/'}>Home</Link>
        </div>
      </div>
      <div>
        <h1>Users</h1>
        <table className='table-auto border-collapse border w-3/4 mx-auto'>
          <thead>
          <tr className='w-full'>
              <th className='w-full border-collapse border  capitalize'>fullname</th>
              <th className='w-full border-collapse border  capitalize'>email</th>
              <th className='w-full border-collapse border  capitalize'>phoneNumber</th>
              <th className='w-full border-collapse border  capitalize'>vehicle make</th>
              <th className='w-full border-collapse border  capitalize'>vehicle type</th>
              <th className='w-full border-collapse border  capitalize'>status</th>
              <th className='w-full border-collapse border  capitalize'>approved</th>
              
          </tr>
          </thead>
          {users && users.map(user =>(
              <tbody key={user._id}>
              <tr>
                <td className='w-full border-collapse border px-2 capitalize'>{user.ownerName}</td>
                <td className='w-full border-collapse border px-2 capitalize'>{user.email}</td>
                <td className='w-full border-collapse border px-2 capitalize'>{user.phoneNumber}</td>
                <td className='w-full border-collapse border px-2 capitalize'>{user.vehicleMake}</td>
                <td className='w-full border-collapse border px-2 capitalize'>{user.vehicleType}</td>
                <td className='w-full border-collapse border px-2 capitalize'>{user.status}</td>
                <td className='w-full border-collapse border px-2 capitalize'>{user.approved}</td>
                <td className='bg-green-600 px-4 py-2 capitalize'><NavLink to={`/admin-user-dashboard/${user._id}`}>view detail</NavLink></td>
              </tr>
              </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Admin