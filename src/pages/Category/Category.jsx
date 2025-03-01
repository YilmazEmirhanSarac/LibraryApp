import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Category.css'
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

const initialCategory = {
  name: '',
  description: ''
}

function Category() {

  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [Categories, setCategories] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert , setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // get
  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + '/api/v1/categories')
      setCategories(res.data)
      console.log(res.data)
      setUpdate(true)
    }
    request();
  }, [update]);

  // post
  const handleCategoryPost = async () => {
    axios.post (import.meta.env.VITE_BASE_URL + '/api/v1/categories', newCategory)
    setUpdate(false)
    setNewCategory(initialCategory)
    handleAlert('Kategori eklendi')
  }

  const handleAlert = (alertM) => {
    setAlertMessage(alertM)
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }

  // delete
  const handleCategoryDelete = async (id) => {
    const response = axios.delete(import.meta.env.VITE_BASE_URL + `/api/v1/categories/${id}`)
    handleAlert('Kategori silindi')
    setUpdate(false)
  }

  const handleUpdateForm = (category) => {
    setUpdateCategory(category)
  }

  const handleUptadeCategory = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/categories/${updateCategory.id}`, updateCategory)
  setUpdateCategory(initialCategory)
  handleAlert('Kategori guncellendi')
  setUpdate(false)
}

  return (
    <div>
      <Typography variant='h4' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '3rem',}}>Kategori Bilgisi Ekle</Typography>

      <div className='newPublisher' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
        {Object.keys(initialCategory).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={newCategory[key]}
            onChange={(e) => 
              setNewCategory((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant='contained' onClick={handleCategoryPost}  sx={{ width: '120px', height: '44px' }}>Ekle</Button>
      </div>

      <Typography variant='h4' sx={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '3rem'}}>Kategori Bilgisi Güncelle</Typography>
      
      <div className='newCategory' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'flex-start'}}>
        {Object.keys(initialCategory).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key}
            variant="standard"
            value={updateCategory[key]}
            onChange={(e) => 
              setUpdateCategory((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant='contained' onClick={handleUptadeCategory} sx={{ width: '120px', height: '44px' }}>Güncelle</Button>
      </div>

      <Typography variant='h4' style={{ textAlign: "left", margin: "auto", width: '90%', paddingTop: '6rem', paddingBottom: '1rem'}}>Kategoriler</Typography>
      <TableContainer component={Paper} sx={{ minWidth: 650, width: '90%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650, width: '100%', margin: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell sx={{fontWeight: 600}}>Kategori adi</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Aciklama</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Sil</TableCell>
            <TableCell sx={{fontWeight: 600}} align="center">Güncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Categories?.map((category) => (
            <TableRow
              key={category.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="center">{category.description}</TableCell>
              <TableCell align="center"> <DeleteForeverIcon className='deleteIcon' onClick={() => handleCategoryDelete(category.id)}/> </TableCell>
              <TableCell align="center"> <SystemUpdateIcon className='updateCategory' onClick={() => handleUpdateForm(category)}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {alert && <h1>{alertMessage}</h1>}
    </div>
  )
}

export default Category