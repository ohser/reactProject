import { useState, useEffect, useCallback } from "react";
import utils from "./utilss";
import Task from "./Task";
import axios from "axios";
import Tasks from "./Tasks";
import Posts from "./Posts";
import "./case1child.css";
const todosURL = "https://jsonplaceholder.typicode.com/todos";
const postsURL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

function Case1Child(props) {

  const [orange, setOrange] = useState(false);
  const [showaddtasks, setShowAddtasks] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([
    {
      zipcode: "",
      street: "",
      email: "",
      name: "",
      city: "",
    },
  ]);
  // console.log(props);
  const [users, setUsers] = useState({ props });

  const [posts, setPosts] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (props.user.id !== undefined && props.user.id <= 10) {
      async function getAlltasks() {

        const { data: arr } = await utils.getById(USERS_URL, props.user.id);
        // console.log(arr)

        setUser({
          name: arr.name,
          email: arr.email,
          zipcode: arr.address.zipcode,
          street: arr.address.street,
          city: arr.address.city,
        });

        const todosURL = "https://jsonplaceholder.typicode.com/todos";

        let data = await utils.getItemById(todosURL, props.user.id);

        setTasks(data);

        let { data: posts } = await utils.getAll(postsURL);

        setPosts(posts.splice(0, 5));
      }
      getAlltasks();
    }

  }, []);

  const setData = async (e) => {
    e.preventDefault();

    const { data } = await utils.updateItem(USERS_URL, props.user.id, user);
    // console.log(data)
  };

  const Delete = async () => {
    const { data } = await axios.delete(`${USERS_URL}/${props.user.id}`);
  };

  const getOrange = () => {
    if (orange === false) {
      setOrange(!orange);
    } else {
      setOrange(orange === false);
    }
  };

  const showAddtasks = () => {
    if (showaddtasks === false) {
      setShowAddtasks(!showaddtasks);
    } else {
      setShowAddtasks(showaddtasks === false);
    }
  };

  const [showaddposts, setShowAddpost] = useState(true);

  const showAddposts = () => {
    if (showaddposts === false) {
      setShowAddpost(!showaddposts);
    } else {
      setShowAddpost(showaddposts === false);
    }
  };

  const [newTask, setNewTask] = useState({ title: "", completed: false });
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const addTask = () => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
    setNewTask({ userId: props.user.id, title: "", completed: false, id: 6 });
    setShowAddtasks(false);
  };

  const addPost = () => {
    setPosts((prevPost) => {
      const updatedPost = [...prevPost, newPost];
      return updatedPost;
    });
    setNewPost({ userId: props.user.id, title: "", body: "", id: 6 });
    setShowAddpost(true);
  };

  return (
    <>
      <main style={{ display: "flex", gap: "300px" }}>
        <section
          style={{
            backgroundColor: orange ? "orange" : "white",
            border: completedTasks ? "5px solid green" : "5px solid red",
            width: "300px",
            height: "fit-content",

            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <label
            className="id-element"
            style={{ color: "black" }}
            onClick={getOrange}
          >
            ID :{props.user.id}
          </label>

          <form onSubmit={setData}>
            <br />
            <br />
            <span style={{ color: "black" }}>Name:</span>
            <input
              style={{ color: "black" }}
              value={props.user.name}
              type="text"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <br />
            <br />
            <span style={{ color: "black" }}>Eamil:</span>
            <input
              style={{ color: "black" }}
              value={props.user.email}
              type="text"
              onChange={(e) => setUser(e.target.value)}
            />
            <br />
            <br />
            <div
              style={{
                backgroundColor: "gray",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={() => setShow(true)}
              onClick={() => setShow(false)}
            >
              <h4>Other Data</h4>
              {show && (
                <div style={{ backgroundColor: "#ddd", padding: "10px" }}>
                  Street:
                  <input
                    value={props.user.address?.street}
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, street: e.target.value })
                    }
                  />
                  <br />
                  City :
                  <input
                  
                    value={props.user.address?.city}
                    type="text"
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                  />
                  Zipcode:{" "}
                  <input
                    value={props.user.address?.zipcode}
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, zipcode: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                onClick={setData}
                style={{
                  backgroundColor: "orangered",
                  margin: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                onClick={Delete}
                style={{
                  backgroundColor: "orangered",
                  margin: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </form>
        </section>

        {orange && (
          <section
            style={{
              margin: "20px",
              border: "1px solid black",
              width: "300px",
              backgroundColor: "#white",
            }}
          >
            {showaddtasks && (
              <div
                style={{
                  width: "300px",
                  backgroundColor: "#white",
                }}
              >
                <br></br>
                Title:
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
                <br></br>
                <br></br>
                <button onClick={showAddtasks}>Cancel</button>
                <button onClick={addTask}>Add</button>
              </div>
            )}

            {!showaddtasks && props.user.id <= 10 && (
              <div>
                Todos-User {props.user.id}
                <button onClick={showAddtasks} style={{ marginLeft: "100px" }}>
                  Add
                </button>
                <Tasks
                  setCompletedTasks={setCompletedTasks}
                  userId={props.user.id}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              </div>
            )}

            <br></br>
            <br></br>
            <br></br>

            {!showaddposts && (
              <div
                style={{
                  width: "300px",
                  backgroundColor: "#white",
                }}
              >
                <br></br>
                Title:
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <br></br>
                <br></br>
                Body :
                <input
                  type="text"
                  value={newPost.body}
                  onChange={(e) =>
                    setNewPost({ ...newPost, body: e.target.value })
                  }
                />
                <br></br>
                <br></br>
                <button onClick={showAddposts}>Cancel</button>
                <button onClick={addPost}>Add</button>
                <br></br>
                <br></br>
              </div>
            )}

            {showaddposts && (
              <div>
                Posts-User {props.user.id}
                <button onClick={showAddposts} style={{ marginLeft: "100px" }}>Add</button>
                <Posts posts={posts} />
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
export default Case1Child;
