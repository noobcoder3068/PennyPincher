// import React from 'react';
// import './display.css';
// import AddGet from './after/AddGet';
// import Charts from './after/Graphical';
// import Feedback from './after/Feedback';
// import SideBar from './after/sidebar';
// import { Routes, Route, useParams } from 'react-router-dom';

// const Display = () => {
//   const {user_id}= useParams();

//   if (!user_id) {
//     console.error('Invalid user_id:', user_id);
//     return <div>Error: Invalid user ID</div>;
//   }

//   return (
//     <div className="display-container">
//       <SideBar user_id={user_id}/>
//       <div className="display-content">
//         <Routes>
//           <Route path="/" element={<AddGet user_id={user_id}/>} />
//           <Route path="/Charts" element={<Charts user_id={user_id} />} />
//           <Route path="/FeedBack" element={<Feedback user_id={user_id} />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Display;
