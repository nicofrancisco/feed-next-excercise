import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { TOTAL_POST_COUNT } from "../types";
import { generateRandomId } from "../utils/generateRandomId";

let postCount = TOTAL_POST_COUNT

const useMockRealTimeUpdates = (socketInstance: Socket) => {
  const socket = socketInstance
  const dispatch = useDispatch();

  useEffect(() => {
    const addNewPost = () => {
      if (socket.connected) {
        postCount++
  
        socket.emit('addPost',
          {
            id: postCount,
            title: `New Post Title ${postCount}`,
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus molestie gravida pretium. Quisque efficitur turpis ipsum, vel bibendum ipsum egestas sit amet. Nam interdum, nibh ut convallis aliquam, dolor felis vehicula augue, quis venenatis magna tortor ut tortor. Maecenas condimentum magna vitae faucibus fringilla. Sed sed ante volutpat, iaculis nunc non, placerat ex. Curabitur nibh leo, congue nec laoreet interdum, imperdiet quis sapien. Proin interdum sapien at ante semper volutpat. Sed lobortis viverra felis, non luctus mauris consectetur sed. Mauris pellentesque urna et quam faucibus, id pulvinar lectus efficitur.",
            userId: generateRandomId(),
            created: new Date().toISOString(),
          })
      }
    }

    const interval = setInterval(() => {
      addNewPost()
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useMockRealTimeUpdates;
