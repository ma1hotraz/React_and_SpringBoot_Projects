import React from 'react'
import MainNavBar from '../component/MainNavBar';
import Note1 from '../images/note1.png'
import Note2 from '../images/note2.png'
import Note3 from '../images/note3.png'
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getText from '../utils/TextUtils';

export default function Main() {

  const navigate = useNavigate();

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
            <Typography variant='h4'>{getText('NOTE App')}</Typography>
            <Typography variant='h6'>
              {getText('The Notes App is a user-friendly digital tool designed to empower users to effortlessly create and manage their notes. With its intuitive interface and versatile features, this application simplifies the process of capturing, organizing, and retrieving information. Users can easily compose notes on a wide range of topics, from personal thoughts and to-do lists to important reminders and creative ideas. The app offers the flexibility to format text, insert images, and categorize notes, ensuring that every piece of information is well-structured and accessible. Furthermore, users can synchronize their notes across multiple devices, guaranteeing that their valuable insights are never out of reach. The Notes App is the ultimate solution for those seeking a convenient and efficient way to document their thoughts and ideas in a digital format.')}
            </Typography>
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
        <Divider style={{ margin: '10px' }}>{getText('ADD NOTES')}</Divider>
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
            <Typography variant='h4'>{getText('Advantage of Using Notes')}</Typography>
            <Typography variant='h6'>
              {getText('A notes app offers users a versatile and efficient platform for creating and managing notes, providing several distinct advantages. Firstly, it enables users to capture their thoughts, ideas, and important information in a digital format, allowing for easy access and retrieval at any time. Additionally, these apps often include features such as text formatting, organization into categories or folders, and the ability to attach images or files, enhancing the note-taking experience. With the convenience of cloud synchronization, users can access their notes across various devices, ensuring seamless productivity. Furthermore, the search functionality simplifies finding specific notes amidst a large collection, while the capacity to set reminders and notifications ensures that important tasks or deadlines are not overlooked. Overall, a notes app significantly streamlines and enhances the process of creating and managing notes, making it an invaluable tool for both personal and professional use.')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Box>
              <img src={Note2} alt="Note2" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </Box>
          </Grid>
        </Grid>
        <Divider style={{ margin: '10px' }}>{getText('MANAGE NOTES')}</Divider>

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
            <Typography variant='h4'>{getText('Encryption Feature')}</Typography>
            <Typography variant='h6'>{getText('The encryption feature in our notes app is a robust security measure designed to protect user data and ensure privacy. It leverages Advanced Encryption Standard (AES), a widely recognized and trusted encryption algorithm, to safeguard the information stored within the app. AES encryption employs a strong and complex cipher to scramble the data, making it virtually impossible for unauthorized individuals to access or decipher sensitive content. This means that your personal notes, thoughts, and any confidential information you store in the app remain secure and confidential. Our commitment to data protection and privacy is reflected in the implementation of AES encryption, ensuring that your data is shielded from potential threats and breaches, allowing you to use the app with peace of mind and confidence in the security of your personal information.')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <img src={Note3} alt="Note3" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </Box>
          </Grid>
        </Grid>

        <Divider style={{ margin: '10px' }}>{getText('BACKUP NOTES')}</Divider>

        <Box sx={{ margin: '100px' }} display="flex" flexDirection={"column"} >
          <Box display="flex" justifyContent={"center"} >
            <Button variant="contained" size='large' color='secondary' onClick={() => {navigate('/Signin');}} >Get Started</Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
