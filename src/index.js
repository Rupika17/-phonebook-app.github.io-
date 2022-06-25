import React, { useState } from "react";
import ReactDOM from "react-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

const style = {
  table: {
    borderCollapse: "collapse"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px"
    },
    inputs: {
      marginBottom: "5px",
      display: "block"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
      color: "#fff"
    }
  }
};
let dataSearch=[];
const PhoneBookForm = (props) => {
  // State
  const initState = {
    id: null,
    userFirstname: "",
    userLastname: "",
    userPhone: ""
  };
  
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(initState);
  const [editIndex, seteditIndex] = useState("");

  // Change Handler
  const userChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !userData.userFirstname ||
      !userData.userLastname ||
      !userData.userPhone
    )
      return;
    props.addUserItem(userData);
    setUserData(initState);
  };

  const [search, setSearch] = React.useState('');
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
    dataSearch = props.users.filter((item) =>
      item.userFirstname.includes(search))
  };

  const sortedUsers = props.users.sort((a, b) =>
    a.userLastname.localeCompare(b.userLastname)
  );
  const handleRemoveClick = (i) => {
    const list = [...sortedUsers];
    list.splice(i, 1);
    props.setUsers(list);
};

const handleEditClick = (i) => {
  setIsEdit(true)
  const list = [...sortedUsers];
  setUserData(list[i]);
  seteditIndex(i);
};

const editHandler=()=>{
  if(isEdit){
    sortedUsers[editIndex]=userData;
  }
  setUserData(initState);
  seteditIndex('');
  setIsEdit(false);
}

  const display =
    sortedUsers.length > 0 ? (
      sortedUsers.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.userFirstname}</td>
          <td style={style.tableCell}>{user.userLastname}</td>
          <td style={style.tableCell}>{user.userPhone}</td>
          <td style={style.tableCell} onClick={(e)=>handleEditClick(index)}><EditIcon /></td>
          <td style={style.tableCell} onClick={(e)=>handleRemoveClick(index)}><DeleteOutlineIcon /></td>
        </tr>
      ))
    ) : (
      <tr clospan={3}>&nbsp;</tr>
    );
    const displaySearch =
    dataSearch.length > 0 ? (
      dataSearch.map((user, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{user.userFirstname}</td>
          <td style={style.tableCell}>{user.userLastname}</td>
          <td style={style.tableCell}>{user.userPhone}</td>
          <td style={style.tableCell} onClick={(e)=>handleEditClick(index)}><EditIcon /></td>
          <td style={style.tableCell} onClick={(e)=>handleRemoveClick(index)}><DeleteOutlineIcon /></td>
        </tr>
      ))
    ) : (
      <tr clospan={3}>&nbsp;</tr>
    );

  return (
    <>
    <form onSubmit={submitHandler} style={style.form.container}>
      <br />

      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={userData.userFirstname}
        onChange={userChangeHandler}
        placeholder="First Name"
      />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={userData.userLastname}
        onChange={userChangeHandler}
        placeholder="Last Name"
      />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="number"
        maxlength="10"
        value={userData.userPhone}
        onChange={userChangeHandler}
        placeholder="Phone Number"
      />

      {/* Submit Button */}
      {isEdit ? 
      <Button variant="contained"  onClick={editHandler}>Save</Button>
      :<Button variant="contained"  onClick={submitHandler}>Add User</Button>
      }
    </form>
    <label htmlFor="search">
    Search by Name:
    <input id="search" type="text" onChange={handleSearch} />
  </label>
  <br /> <br />
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
          <th style={style.tableCell}>Edit</th>
          <th style={style.tableCell}>Delete</th>
        </tr>
      </thead>
      <tbody>{search ? displaySearch : display}</tbody>
    </table>
    </>
  );
};

const App = (props) => {
  const usersListObjc = [];
  const [users, setUsers] = useState(usersListObjc);

  const addUserItem = (user) => {
    console.log("user", users.length);
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  return (
    <section>
      <PhoneBookForm addUserItem={addUserItem} users={users} setUsers={setUsers}/>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
