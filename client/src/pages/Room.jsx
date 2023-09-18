import { useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const Room = ({ username, room }) => {
  const [roomUsers, setRoomUsers] = useState(["user1", "user2", "user3"]);
  const [receivedMessages, setReceivedMessages] = useState([
    "user1",
    "user2",
    "user3",
  ]);
  return (
    <section className="flex gap-4 h-screen">
      {/* left side */}
      <div className="w-1/3 bg-blue-500 text-white font-medium relative">
        <p className="text-3xl font-bold text-center mt-5">Room.io</p>
        <div className="mt-10 ps-2">
          <p className="text-lg flex items-end gap-1">
            <ChatBubbleLeftRightIcon width={30} />
            Room Name
          </p>
          <p className="bg-white text-blue-500 ps-5 py-2 rounded-tl-full rounded-bl-full my-2">
            {room}
          </p>
        </div>
        <div className="mt-5 ps-2">
          <p className="flex items-end gap-1 text-lg mb-3">
            <UserGroupIcon width={30} />
            Users
          </p>
          {roomUsers.map((user, i) => (
            <p key={i} className="flex items-end gap-1 text-sm my-2">
              <UserIcon width={24} />
              {user}
            </p>
          ))}
        </div>
        <button
          type="button"
          className="absolute bottom-0 p-2.5 flex items-enter gap-1 w-full mx-2 mb-2 text-lg"
        >
          <ArrowRightOnRectangleIcon width={30} />
          Leave Room
        </button>
      </div>
      {/* right side */}
      <div className="w-full pt-5 relative">
        <div className="h-[30rem] overflow-y-auto">
          {receivedMessages.map((msg, i) => (
            <div
              key={i}
              className="text-white bg-blue-500 px-3 py-2 mb-3 w-3/4 rounder-br-3xl rounded-tl-3xl"
            >
              <p className="text-sm font-medium font-mono">from bot</p>
              <p className="text-lg font-medium">{msg}</p>
              <p className="text-sm font-mono font-medium text-right">
                less than a minute
              </p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 my-2 py-2.5 flex items-end w-full px-2">
          <input
            type="text"
            placeholder="message ..."
            className="w-full outline-none border-b text-lg me-2"
          />
          <button type="button">
            <PaperAirplaneIcon
              width={30}
              className="hover:text-blue-500 hover:-rotate-45 duration-200"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Room;
