
import { useAuth } from "../Contexts/AuthContext";

/* 
{
      id: 1768147266643,
            userName: "Fares Ahmed",
      userId:5644,
      text: "Hey, this is my comment",
      createdAt: "2023-01-16T12:37:46.643Z",
      userImage: "",
      items: [
        {
        id: 1768147284466,
                userName: "Sama Omar",
         userId:5645,
        text: "yes it",
        createdAt: "2023-02-16T12:37:46.643Z",
        userImage: "",
        items:[]
      
      
    }
      ]
      
      
    }
 */
const useNode = () => {
  
      const { user } = useAuth();
  const insertNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        userId: user.user.userId,
        text: item,
        userName: user.user.name,
        createdAt: "2023-02-16T12:37:46.643Z",
        userImage: "",
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item);
    });

    return { ...tree, items: latestNode };
  };

  const editNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.text = value;
      return tree;
    }

    tree.items.map((ob) => {
      return editNode(ob, commentId, value);
    });

    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};
 
export default useNode;