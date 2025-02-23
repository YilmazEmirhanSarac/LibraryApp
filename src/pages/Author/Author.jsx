import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Author.css'
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

const initialAuthor = {
  name: '',
  birthDate: '',
  country: ''
}

function Author() {

  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [authors, setAuthors] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert , setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // get
  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + '/api/v1/authors')
      setAuthors(res.data)
      console.log(res.data)
      setUpdate(true)
    }
    request();
  }, [update]);

  // post
  const handleAuthorPost = async () => {
    axios.post (import.meta.env.VITE_BASE_URL + '/api/v1/authors', newAuthor)
    setUpdate(false)
    setNewAuthor(initialAuthor)
    handleAlert('Yazar eklendi')
  }

  const handleAlert = (alertM) => {
    setAlertMessage(alertM)
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }

  // delete
  const handleAuthorDelete = async (id) => {
    const response = axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/authors/${id}`)
    handleAlert('Yazar silindi')
    setUpdate(false)
  }

  const handleUpdateForm = (author) => {
    setUpdateAuthor(author)
  }

  const handleUpdateAuthor = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/authors/${updateAuthor.id}`, updateAuthor)
  setUpdateAuthor(initialAuthor)
  handleAlert('Yazar guncellendi')
  setUpdate(false)
}

  return (
    <div>
      <Typography variant='h4' style={{ textAlign: "center", margin: "20px"}}>Yazar Ekle</Typography>

      <div className='newAuthor'>
        {Object.keys(initialAuthor).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={newAuthor[key]}
            onChange={(e) => 
              setNewAuthor((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant='contained' onClick={handleAuthorPost}>Yazar Ekle</Button>
      </div>

      <Typography variant='h4' style={{ textAlign: "center", margin: "20px"}}>Yazar Bilgisi Guncelle</Typography>

      <div className='newAuthor'>
        {Object.keys(initialAuthor).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={updateAuthor[key]}
            onChange={(e) => 
              setUpdateAuthor((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant='contained' onClick={handleUpdateAuthor}>Yazar Guncelle</Button>
      </div>

      <Typography variant='h1' style={{ textAlign: "center", margin: "20px"}}>Yazarlar</Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ad Soyad</TableCell>
            <TableCell align="center">Dogum Yili</TableCell>
            <TableCell align="center">Ulke</TableCell>
            <TableCell align="center">Sil</TableCell>
            <TableCell align="center">Guncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors?.map((author) => (
            <TableRow
              key={author.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {author.name}
              </TableCell>
              <TableCell align="center">{author.birthDate}</TableCell>
              <TableCell align="center">{author.country}</TableCell>
              <TableCell align="center"> <DeleteForeverIcon className='deleteIcon' onClick={() => handleAuthorDelete(author.id)}/> </TableCell>
              <TableCell align="center"> <SystemUpdateIcon className='updateAuthor' onClick={() => handleUpdateForm(author)}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {alert && <h1>{alertMessage}</h1>}
    </div>
  )
}

export default Author