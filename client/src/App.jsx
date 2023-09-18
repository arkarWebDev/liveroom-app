import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages imports
import Welcome from "./pages/Welcome";
import Room from "./pages/Room";
import { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Welcome
          username={username}
          setUsername={setUsername}
          setRoom={setRoom}
          room={room}
        />
      ),
    },
    {
      path: "chat",
      element: <Room username={username} room={room} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
