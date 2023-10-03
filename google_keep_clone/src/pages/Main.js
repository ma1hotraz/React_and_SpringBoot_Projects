import React from 'react'
import MainNavBar from '../component/MainNavBar';
import Note1 from '../images/note1.png'
import Note2 from '../images/note2.png'
import Note3 from '../images/note3.png'
import { Box, Button, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Main() {

  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate('/signin');
  }



  return (
    <div>
      <MainNavBar />
      <Box style={{ marginTop: '60px' }}>

        <Grid
          container
          xs={12}
          md={12}
          sx={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          <Grid item xs={12} sm={6} sx={{ padding: '0 10px 0 10px' }}>
            <h1>NOTE 1</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
              aperiam eveniet aut labore cum? Eaque ullam impedit sapiente
              ratione sit doloremque suscipit consequatur recusandae ex
              repudiandae. Maxime dignissimos alias porro.
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <img
                src={Note1}
                alt="Note1"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider style={{ margin: '10px' }}>ADD NOTES</Divider>


        <Grid container
          xs={12}
          md={12}
          sx={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px'
          }}>
          <Grid item xs={12} sm={6} sx={{ padding: '0 10px 0 10px' }}>
            <h1>NOTE 1</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
              aperiam eveniet aut labore cum? Eaque ullam impedit sapiente
              ratione sit doloremque suscipit consequatur recusandae ex
              repudiandae. Maxime dignissimos alias porro.
            </p>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Box>
              <img src={Note2} alt="Note2" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </Box>
          </Grid>
        </Grid>
        <Divider style={{ margin: '10px' }}>MANAGE NOTES</Divider>

        <Grid container
          xs={12}
          md={12}
          sx={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            padding: '20px'
          }}>
          <Grid item xs={12} sm={6} sx={{ padding: '0 10px 0 10px' }}>
            <h1>NOTE 3</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur fugiat odio sapiente laudantium minima velit libero ex voluptates. Aperiam magnam distinctio dicta, non accusantium tenetur saepe reiciendis consectetur eum maiores.</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <img src={Note3} alt="Note3" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </Box>
          </Grid>
        </Grid>

        <Divider style={{ margin: '10px' }}>BACKUP NOTES</Divider>

        <Box sx={{ margin: '100px' }} display="flex" flexDirection={"column"} >
          <Box display="flex" justifyContent={"center"} >
            <Button variant="contained" size='large' color='secondary' onClick={handleOnclick} >Get Started</Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
