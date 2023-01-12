import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { userType } from "../../utils/types";

const Update = () => {
  const router = useRouter();

  const inputUserIDRef = useRef<HTMLInputElement>(null);
  const inputNamaLengkapRef = useRef<HTMLInputElement>(null);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputStatusRef = useRef<HTMLInputElement>(null);
  console.log(router.query);
  useEffect(() => {
    if (router.query.id)
      axios
        .get("/api/user/" + router.query.id)
        .then((res) => {
          const data: userType = res.data.data;
          
          inputUserIDRef.current!.value = data.userId.toString();
          inputNamaLengkapRef.current!.value = data.namalengkap;
          inputUsernameRef.current!.value = data.username;
          inputPasswordRef.current!.value = data.password;
          inputStatusRef.current!.value = data.status;
        })
        .catch((err) => {
          console.log(err);
        });
  }, [router.query.id]);

  const onSubmit = async () => {
    const body = {
      userId: inputUserIDRef.current?.value || 99,
      namalengkap: inputNamaLengkapRef.current?.value || "",
      username: inputUsernameRef.current?.value || "",
      password: inputPasswordRef.current?.value || "",
      status: inputStatusRef.current?.value || "",
    };

    axios
      .put("/api/user/" + router.query.id, body)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="border border-black rounded-md p-3">
        <h1 className="font-bold text-xl my-3">Update - Form User</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-start">
            <p className="text-lg mb-1">user ID</p>
            <input ref={inputUserIDRef} type="number" placeholder="User ID" className="w-[300px] p-3 border border-gray-700 rounded-md" />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-lg mb-1">Nama Lengkap</p>
            <input ref={inputNamaLengkapRef} type="text" placeholder="Nama Lengkap" className="w-[300px] p-3 border border-gray-700 rounded-md" />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-lg mb-1">Username</p>
            <input ref={inputUsernameRef} type="text" placeholder="Username" className="w-[300px] p-3 border border-gray-700 rounded-md" />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-lg mb-1">Password</p>
            <input ref={inputPasswordRef} type="password" placeholder="Password" className="w-[300px] p-3 border border-gray-700 rounded-md" />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-lg mb-1">Status</p>
            <input ref={inputStatusRef} type="text" placeholder="Status" className="w-[300px] p-3 border border-gray-700 rounded-md" />
          </div>
          <div className="flex gap-2">
            <button onClick={onSubmit} className="grow h-[50px] rounded-md bg-green-600 hover:bg-green-700">
              <p className="text-lg mb-1 text-white">Save</p>
            </button>
            <button onClick={() => router.push("/")} className="grow h-[50px] rounded-md bg-gray-600 hover:bg-gray-700">
              <p className="text-lg mb-1 text-white">Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
