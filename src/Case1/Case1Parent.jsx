import { useState, useEffect } from "react";
import utils from "./utilss";
import Case1Child from "./Case1Child";

const usersURL = "https://jsonplaceholder.typicode.com/users";
const todosURL = "https://jsonplaceholder.typicode.com/todos";

function Case1Parent() {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    async function getUsers() {
      let { data } = await utils.getAll(usersURL);
      // console.log(data)
      setUsers(data);
      setUsers2(data);
    }
    getUsers();
  }, []);

  const getuser = (e) => {
    const arr = users2.filter((x) => x.name.includes(e.target.value));
    setUsers(arr);
  };

  const [showadduser, setShowAdduser] = useState(true);

  const showAddusers = () => {
    if (showadduser === false) {
      setShowAdduser(!showadduser);
    } else {
      setShowAdduser(showadduser === false);
    }
  };


  const addUser = () => {
    const newUserToAdd = { name: newUser.name, email: newUser.email };
    setUsers((prevUsers) => [...prevUsers, newUserToAdd]);
    setNewUser({ name: "", email: "",id: 11 });
    setShowAdduser(true);
  };
  
  return (
    <>
      <main>
        Search : <input type="text" onChange={getuser}></input>
        <button
          onClick={showAddusers}
          style={{ backgroundColor: "orangered", margin: "10px" }}
        >
          {" "}
          Add{" "}
        </button>
        <br />
        <div>  {/*   // line 59 */}
          {users.map((item) => {
            return <Case1Child key={item.id} user={item} />;
          })}
        </div>
        {!showadduser && (
          <div
            style={{
              position: "fixed",
              top: "100px",
              left: "calc(50% + 150px)",
              transform: "translateX(-50%)",
              border: "1px solid black",
            }}
          >
            <div
              style={{
                width: "300px",
                backgroundColor: "#white",
              }}
            >
              <br></br>
              Name:{" "}
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <br></br>
              <br></br>
              Email :
              <input
                type="text"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <br></br>
              <br></br>
              <button onClick={showAddusers}>Cancel</button>{" "}
              <button onClick={addUser}>Add</button>
              <br></br>
              <br></br>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Case1Parent;
