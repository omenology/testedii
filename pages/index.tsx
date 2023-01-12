import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { userType } from "../utils/types";

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState<userType[]>([]);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-3 w-[80vw] m-auto">
      <h1 className="text-xl font-bold my-3">List of user</h1>
      <button onClick={() => router.push("/add")} className="w-[120px] h-[40px] bg-green-500 hover:bg-green-600 rounded-md mb-3">
        <p className="text-white font-bold text-lg">Add</p>
      </button>
      <div className="grid grid-cols-12 border border-gray-800 rounded-md overflow-hidden">
        <div className="col-span-full grid grid-cols-12">
          <div className="flex items-center justify-center h-[40px] border-r border-r-gray-800">No</div>
          <div className="flex items-center justify-center h-[40px] border-r border-r-gray-800">User ID</div>
          <div className="flex items-center justify-center h-[40px] col-span-4 border-r border-r-gray-800">Nama Lengkap</div>
          <div className="flex items-center justify-center h-[40px] col-span-3 border-r border-r-gray-800">Username</div>
          <div className="flex items-center justify-center h-[40px] border-r border-r-gray-800">Status</div>
          <div className="flex items-center justify-center h-[40px] col-span-2">Action</div>
        </div>
        {data.map((user, index) => (
          <div key={user.id} className="col-span-full grid grid-cols-12 border-t-gray-800 border-t">
            <div className="flex p-2 items-center justify-center h-[40px] border-r border-r-gray-800">{index + 1}</div>
            <div className="flex p-2 items-center justify-start h-[40px] border-r border-r-gray-800">{user.userId}</div>
            <div className="flex p-2 items-center justify-start h-[40px] col-span-4 border-r border-r-gray-800">{user.namalengkap}</div>
            <div className="flex p-2 items-center justify-start h-[40px] col-span-3 border-r border-r-gray-800">{user.username}</div>
            <div className="flex p-2 items-center justify-center h-[40px] border-r border-r-gray-800">{user.status}</div>
            <div className="flex gap-3 p-2 items-center justify-center h-[40px] col-span-2">
              <p
                onClick={() => {
                  router.push("/update/" + user.id);
                }}
                className="cursor-pointer"
              >
                Edit
              </p>
              <p
                onClick={() => {
                  axios
                    .delete("/api/user/" + user.id)
                    .then((res) => {
                      const newData: any[] = JSON.parse(JSON.stringify(data));
                      newData.splice(index, 1);
                      setData(newData);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className="cursor-pointer"
              >
                Delete
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
