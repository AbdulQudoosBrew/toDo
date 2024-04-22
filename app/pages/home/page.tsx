"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bcImage from "@/public/bcImage.svg";
import { RxCross2 } from "react-icons/rx";
import navbar from "@/components/navBar";
import Navbar from "@/components/navBar";
interface ToDoItem {
  addItemValue: string;
  addItemCount: number;
  userId: string;
}

export default function Home() {
  const [toDoItems, setToDoItems] = useState<ToDoItem>({
    addItemValue: "",
    addItemCount: 14,
    userId: "",
  });
  const [toDoItemsArray, setToDoItemsArray] = useState<ToDoItem[]>([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setToDoItems((prevItems) => ({
        ...prevItems,
        userId: user.id || "",
      }));
    }
  }, []);

  const handleAddItem = () => {
    setToDoItemsArray((prevItems) => [...prevItems, toDoItems]);
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setToDoItems({
        addItemValue: "",
        addItemCount: 14,
        userId: JSON.parse(user?.id) || "",
      });
    }
  };
  const handleDeleteItem = (indexToDelete: number) => {
    setToDoItemsArray((prevItems) => {
      return prevItems.filter((item, index) => index !== indexToDelete);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setToDoItems((prevItems) => ({
      ...prevItems,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className=" flex flex-row w-[100%] ">
        <div className="flex justify-center  left w-[40%]">
          <div
            style={{
              boxShadow: " 0px 0px 10px 0px white",
            }}
            className="border rounded-lg h-[90%] mt-10 flex flex-col  w-[70%] items-center px-5 bg-[#989398] "
          >
            <h2
              className=""
              style={{
                fontWeight: 700,
                fontSize: "45px",
              }}
            >
              Shoping List
            </h2>
            <div className="inputBox flex flex-row gap-4 justify-center items-center w-[100%] mt-10 ">
              <input
                type="text"
                id={"addItemValue"}
                name={"addItemValue"}
                value={toDoItems.addItemValue}
                placeholder="Title..."
                onChange={handleChange}
                style={{ backgroundColor: "#FFFFFF99", color: "#212121B2" }}
                className="border rounded px-2 py-1 focus:outline-none placeholder-[#212121B2] w-[50%]"
              />
              <input
                type="text"
                id={"addItemCount"}
                name={"addItemCount"}
                value={toDoItems.addItemCount}
                onChange={handleChange}
                style={{ backgroundColor: "#FFFFFF99", color: "#212121B2" }}
                className="border rounded px-2 py-1 focus:outline-none placeholder-[#212121B2] w-[20%]"
              />

              <button
                type="submit"
                onClick={(e) => {
                  handleAddItem();
                }}
                style={{ color: "#FFD700" }}
                className="rounded px-2 py-1 w-[20%] border-[#FFD700] border-2 bg-black"
              >
                Add
              </button>
            </div>
            <div className="mt-5 w-[100%]">
              {toDoItemsArray.map((item, index) => (
                <div className=" mt-5 w-[100%] border-b-[#FFD700] border-b-2">
                  <div className="flex flex-row   items-center justify-between  pb-1 ml-5 mr-2 gap-3">
                    <div
                      style={{ fontWeight: "700" }}
                      className="bg-[#FFD700] p-2 w-10 text-center rounded-lg text-black"
                    >
                      {item.addItemCount}
                    </div>
                    <div
                      style={{ fontWeight: "400" }}
                      className=" bg-transparent flex-1 text-yellow-50"
                    >
                      {item.addItemValue}
                    </div>
                    <div
                      onClick={() => {
                        handleDeleteItem(index);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <RxCross2 color="#FFD700" size={30} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right w-[60%]">
          <Image
            src={bcImage}
            alt={"bcImage"}
            // width={400}
            // height={300}
            // layout="responsive" // Ensures responsiveness across devices
          />
        </div>
      </div>
    </>
  );
}
