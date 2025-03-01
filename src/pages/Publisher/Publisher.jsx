import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Publisher.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';

const initialPublisher = {
  name: '',
  establishmentYear: '',
  address: ''
}

function Publisher() {

  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);
  const [newPublisher, setNewPublisher] = useState(initialPublisher);
  const [publishers, setPublishers] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert , setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // get
  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + '/api/v1/publishers')
      setPublishers(res.data)
      console.log(res.data)
      setUpdate(true)
    }
    request();
  }, [update]);

  // post
  const handlePublisherPost = async () => {
    axios.post (import.meta.env.VITE_BASE_URL + '/api/v1/publishers', newPublisher)
    setUpdate(false)
    setNewPublisher(initialPublisher)
    handleAlert('Yayinevi eklendi')
  }

  const handleAlert = (alertM) => {
    setAlertMessage(alertM)
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }

  // delete
  const handlePublisherDelete = async (id) => {
    const response = axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/publishers/${id}`)
    handleAlert('Yayinevi silindi')
    setUpdate(false)
  }

  const handleUpdateForm = (publisher) => {
    setUpdatePublisher(publisher)
  }

  const handleUpdatePublisher = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/publishers/${updatePublisher.id}`, updatePublisher)
  setUpdatePublisher(initialPublisher)
  handleAlert('Yayinevi guncellendi')
  setUpdate(false)
}

  return (
    <div>
      <Typography variant='h4' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '3rem',}}>Yayinevi Bilgisi Ekle</Typography>

      <div className='newPublisher' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
        {Object.keys(initialPublisher).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={newPublisher[key]}
            onChange={(e) => 
              setNewPublisher((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant='contained' onClick={handlePublisherPost}  sx={{ width: '120px', height: '44px' }}>Ekle</Button>
      </div>

      <Typography variant='h4' sx={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '3rem'}}>Yayinevi Bilgisi Güncelle</Typography>
      
      <div className='newPublisher' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
        {Object.keys(initialPublisher).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={updatePublisher[key]}
            onChange={(e) => 
              setUpdatePublisher((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant='contained' onClick={handleUpdatePublisher} sx={{ width: '120px', height: '44px' }}>Güncelle</Button>
      </div>

      <Typography variant='h4' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '6rem', paddingBottom: '1rem'}}>Yayinevleri</Typography>
      <TableContainer component={Paper} sx={{ minWidth: 650, width: '90%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650, width: '100%', margin: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 600}}>Ad Soyad</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Kurulus Yili</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Address</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Sil</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Güncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers?.map((publisher) => (
            <TableRow
              key={publisher.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {publisher.name}
              </TableCell>
              <TableCell align="center">{publisher.establishmentYear}</TableCell>
              <TableCell align="center">{publisher.address}</TableCell>
              <TableCell align="center"> <DeleteForeverIcon className='deleteIcon' onClick={() => handlePublisherDelete(publisher.id)}/> </TableCell>
              <TableCell align="center"> <SystemUpdateIcon className='updatePublisher' onClick={() => handleUpdateForm(publisher)}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {alert && <h1>{alertMessage}</h1>}
    </div>
  )
}

export default Publisher