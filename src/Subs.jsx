import React, { useState, useEffect } from 'react';
import "./style.css";
import {
  Container,
  Table,
  Button,
  TextInput,
  Textarea,
} from "@mantine/core";
import Sidebar from "./Sidebar.jsx";
import "./home.css";
import { invoke } from "@tauri-apps/api";

const Subs = () => {
  const [myArray, setMyArray] = useState([]);
  const [newRecord, setNewRecord] = useState({ title: '', price: '', id: '' });

  useEffect(() => {
    let j1, j2, j3;

    invoke("showcase_sub", {})
      .then((message2) => {
        const json2 = JSON.parse(message2);
        j2 = json2.message;
        j3 = JSON.parse(j2);
        setMyArray(j3);
      });

    // fetch('https://example.com/data.json')
    //   .then((response) => response.json())
    //   .then((data) => setMyArray(data));
  }, []);

  const handleDelete = (id) => {
    const updatedArray = myArray.filter((item) => item.id !== id);
    setMyArray(updatedArray);
  };

  const handleAdd = () => {
    setMyArray((prevArray) => [...prevArray, newRecord]);
    setNewRecord({ title: '', price: '', id: '' });
  };

  return (
    <div>
      <h1>My Component</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myArray.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.id}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Record</h2>
      <input
        type="text"
        placeholder="Title"
        value={newRecord.title}
        onChange={(e) =>
          setNewRecord({ ...newRecord, title: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Price"
        value={newRecord.price}
        onChange={(e) =>
          setNewRecord({ ...newRecord, price: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="ID"
        value={newRecord.id}
        onChange={(e) => setNewRecord({ ...newRecord, id: e.target.value })}
      />
      <button onClick={handleAdd}>Add Record</button>
    </div>
  );
};

export default Subs;



// import React, { useState, useEffect } from 'react';
// import "./style.css";
// import {
//   Container,
//   Table,
//   Button,
//   TextInput,
//   Textarea,
// } from "@mantine/core";
// import Sidebar from "./Sidebar.jsx";
// import "./home.css";
// import { invoke } from "@tauri-apps/api";


// const Subs = () => {
//   const [myArray, setMyArray] = useState([]);
//   const [newRecord, setNewRecord] = useState({ title: '', price: '', id: '' });

//   useEffect(() => {
//     let j1, j2, j3;
    
//     invoke("showcase_sub", {})
//       .then((message2) => {
//         const json2 = JSON.parse(message2);
//         j2 = json2.message;
//         j3 = JSON.parse(j2);
//         setMyArray(j3);
//       });

//     // fetch('https://example.com/data.json')
//     //   .then((response) => response.json())
//     //   .then((data) => setMyArray(data));
//   }, []);


//   const handleDelete = (id) => {
//     const updatedArray = myArray.filter((item) => item.id !== id);
//     setMyArray(updatedArray);
//   };

//   const handleAdd = () => {
//     setMyArray((prevArray) => [...prevArray, newRecord]);
//     setNewRecord({ title: '', price: '', id: '' });
//   };

//   return (
//     <div>
//       <h1>My Component</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Price</th>
//             <th>ID</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {myArray.map((item) => (
//             <tr key={item.id}>
//               <td>{item.title}</td>
//               <td>{item.price}</td>
//               <td>{item.id}</td>
//               <td>
//                 <button onClick={() => handleDelete(item.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Add New Record</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={newRecord.title}
//         onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Price"
//         value={newRecord.price}
//         onChange={(e) => setNewRecord({ ...newRecord, price: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="ID"
//         value={newRecord.id}
//         onChange={(e) => setNewRecord({ ...newRecord, id: e.target.value })}
//       />
//       <button onClick={handleAdd}>Add Record</button>
//     </div>
//   );
// };

// export default Subs;

















// import React, { useState, useEffect } from 'react';

// const Subs = () => {
//   const [myArray, setMyArray] = useState([]);
//   const [newRecord, setNewRecord] = useState({ title: '', price: '', id: '' });

//   useEffect(() => {
//     let j1, j2, j3;
    
//   invoke("showcase_sub", {})
//   .then((message2) => {
//         const json2 = JSON.parse(message2);
//         j2 = json2.message;
//         j3 = JSON.parse(j2);
//         setMyArray(j3);



//     // fetch('https://example.com/data.json')
//     //   .then((response) => response.json())
//     //   .then((data) => setMyArray(data));
//   }, []);


//   const handleDelete = (id) => {
//     const updatedArray = myArray.filter((item) => item.id !== id);
//     setMyArray(updatedArray);
//   };

//   const handleAdd = () => {
//     setMyArray((prevArray) => [...prevArray, newRecord]);
//     setNewRecord({ title: '', price: '', id: '' });
//   };

//   return (
//     <div>
//       <h1>My Component</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Price</th>
//             <th>ID</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {myArray.map((item) => (
//             <tr key={item.id}>
//               <td>{item.title}</td>
//               <td>{item.price}</td>
//               <td>{item.id}</td>
//               <td>
//                 <button onClick={() => handleDelete(item.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Add New Record</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={newRecord.title}
//         onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Price"
//         value={newRecord.price}
//         onChange={(e) => setNewRecord({ ...newRecord, price: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="ID"
//         value={newRecord.id}
//         onChange={(e) => setNewRecord({ ...newRecord, id: e.target.value })}
//       />
//       <button onClick={handleAdd}>Add Record</button>
//     </div>
//   );
// }; ) 

// export default Subs;
