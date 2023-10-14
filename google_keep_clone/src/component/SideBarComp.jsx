// import React, { useState, useEffect } from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faDashboard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { Box, Typography } from '@mui/material';

// export default function SideBarComp() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     // Handle any logic you want when the sidebar is collapsed or expanded
//   }, [isCollapsed, windowWidth]);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleResize = () => {
//     setWindowWidth(window.innerWidth);

//     if (window.innerWidth < 1100) {
//       setIsCollapsed(true);
//     } else {
//       setIsCollapsed(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <>

//       <div >
//       <Sidebar
//         collapsed={isCollapsed}
//         style={{ height: '100vh', marginTop: '50px', transition: 'all 0.3s' }}
//       >
//         <Menu iconShape="square">
//           <MenuItem
//             onClick={toggleSidebar}
//             style={{ textAlign: 'center', cursor: 'pointer' }}
//           >
//             <Box>
//               {isCollapsed ? (
//                 <div>
//                 <FontAwesomeIcon icon={faBars} />
//                 <h1>dfiu</h1>
//                 </div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                   <FontAwesomeIcon icon={faBars} />
//                   <div style={{ width: '10px' }}></div>
//                   <Typography variant='h5'>Admin Panel</Typography>
//                 </div>
//               )}
//             </Box>
//           </MenuItem>
//         </Menu>
//         <Menu>
//           <Box
//             style={{
//               padding: '10px',
//               marginLeft: '10px',
//             }}
//           >
//             {isCollapsed ? (
//               <Box>
//                 <FontAwesomeIcon icon={faDashboard} size='2x' />
//               </Box>
//             ) : (
//               <div style={{ display: 'flex' }}>
//                 <FontAwesomeIcon icon={faDashboard} size='2x' />
//                 <div style={{ width: '20px' }}></div>
//                 <Typography variant='h6'>Dashboard</Typography>
//               </div>
//             )}
//           </Box>
//         </Menu>
//         <Menu>
//           <SubMenu title='Search' icon={<FontAwesomeIcon icon={faMagnifyingGlass} title='Search' size='2x' />}>
//             <MenuItem>
//               <Typography variant='body1'>Search By Email</Typography>
//             </MenuItem>
//             <MenuItem>
//               <Typography variant='body1'>Search By Name</Typography>
//             </MenuItem>
//             <MenuItem>
//               <Typography variant='body1'>Search By Date</Typography>
//             </MenuItem>
//             <MenuItem>
//               <Typography>{windowWidth}</Typography>
//             </MenuItem>
//           </SubMenu>
//         </Menu>
//       </Sidebar>
//     </div>

//     <div style={{marginTop: '60px', backgroundColor: 'grey'}}>cg</div>
//     {/* </div> */}
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDashboard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography } from '@mui/material';

export default function SideBarComp() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handle any logic you want when the sidebar is collapsed or expanded
  }, [isCollapsed, windowWidth]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);

    if (window.innerWidth < 1100) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (

    <div style={{ display: 'flex' }}>
      <Sidebar
        collapsed={isCollapsed}
        style={{ minHeight: '90vh', marginTop: '60px', transition: 'all 0.3s' }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={toggleSidebar}
            style={{ textAlign: 'center', cursor: 'pointer' }}
          >
            <Box>
              {isCollapsed ? (
                <FontAwesomeIcon icon={faBars} />

              ) : (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faBars} />
                  <div style={{ width: '10px' }}></div>
                  <Typography variant='h5'>Admin Panel</Typography>
                </div>
              )}
            </Box>
          </MenuItem>
        </Menu>
        <Menu>
          <Box
            style={{
              padding: '10px',
              marginLeft: '10px',
            }}
          >
            {isCollapsed ? (
              <Box>
                <FontAwesomeIcon icon={faDashboard} size='2x' />
              </Box>
            ) : (
              <div style={{ display: 'flex' }}>
                <FontAwesomeIcon icon={faDashboard} size='2x' />
                <div style={{ width: '20px' }}></div>
                <Typography variant='h6'>Dashboard</Typography>
              </div>
            )}
          </Box>
        </Menu>
        <Menu>
          <SubMenu title='Search' icon={<FontAwesomeIcon icon={faMagnifyingGlass} title='Search' size='2x' />}>
            <MenuItem>
              <Typography variant='body1'>Search By Email</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant='body1'>Search By Name</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant='body1'>Search By Date</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>{windowWidth}</Typography>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
