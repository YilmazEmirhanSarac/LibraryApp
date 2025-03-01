import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Book.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TextField from "@mui/material/TextField";
import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const initialBook = {
  name: "",
  publicationYear: "",
  stock: "",
  author: {
    id: "",
    name: ""
  },
  publisher: {
    id: "",
    name: ""
  },
  categories: [],
};

function Book() {
  const [updateBook, setUpdateBook] = useState(initialBook);
  const [newBook, setNewBook] = useState(initialBook);
  const [books, setBooks] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/v1/books"
      );
      setBooks(res.data);
      console.log(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  useEffect(() => {
    const fetchData = async () => {
      const authorsResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/authors`
      );
      const publishersResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/publishers`
      );
      const categoriesResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/categories`
      );
      setAuthors(authorsResponse.data);
      setPublishers(publishersResponse.data);
      setCategories(categoriesResponse.data);
    };
    fetchData();
  }, []);

  // post
  const handleBookPost = async () => {
    const bookToSend = {
      name: newBook.name,
      publicationYear: Number(newBook.publicationYear),
      stock: Number(newBook.stock),
      author: { id: newBook.author.id },
      publisher: { id: newBook.publisher.id },
      categories: newBook.categories.map((category) => ({ id: category.id })),
    };

    await axios
      .post(import.meta.env.VITE_BASE_URL + "/api/v1/books", bookToSend)
      .then(() => {
        setUpdate(false);
        setNewBook(initialBook);
        handleAlert("Kitap eklendi");
      })
      .catch((err) => console.error(err));
  };

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  // delete
  const handleBookDelete = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/books/${id}`
      );
      handleAlert("Kitap silindi");
      setUpdate(false);
    } catch (err) {
      console.error(err);
      handleAlert("Silme işlemi başarısız");
    }
  };

  const handleUpdateForm = (book) => {
    // Make sure to preserve the structure needed for the form
    setUpdateBook({
      ...book,
      author: book.author || { id: "", name: "" },
      publisher: book.publisher || { id: "", name: "" },
      categories: book.categories || []
    });
  };

  const handleUpdateBook = async () => {
    try {
      // Format data for the PUT request
      const bookToUpdate = {
        name: updateBook.name,
        publicationYear: Number(updateBook.publicationYear),
        stock: Number(updateBook.stock),
        author: { id: updateBook.author.id },
        publisher: { id: updateBook.publisher.id },
        categories: updateBook.categories.map((category) => ({ id: category.id })),
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/books/${updateBook.id}`,
        bookToUpdate
      );
      
      setUpdateBook(initialBook);
      handleAlert("Kitap güncellendi");
      setUpdate(false);
    } catch (err) {
      console.error(err);
      handleAlert("Güncelleme işlemi başarısız");
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          textAlign: "left",
          margin: "auto",
          width: "90%",
          paddingTop: "3rem",
        }}
      >
        Kitap Bilgisi Ekle
      </Typography>

      <div
        className="newBook"
        style={{
          textAlign: "left",
          margin: "auto",
          width: "90%",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          id="name"
          label="Kitap Adı"
          variant="standard"
          value={newBook.name}
          onChange={(e) =>
            setNewBook((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <TextField
          id="publicationYear"
          label="Yayın Yılı"
          type="number"
          variant="standard"
          value={newBook.publicationYear}
          onChange={(e) =>
            setNewBook((prev) => ({ ...prev, publicationYear: e.target.value }))
          }
        />

        <TextField
          id="stock"
          label="Stok"
          type="number"
          variant="standard"
          value={newBook.stock}
          onChange={(e) =>
            setNewBook((prev) => ({ ...prev, stock: e.target.value }))
          }
        />

        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Author</InputLabel>
          <Select
            value={newBook.author.id || ""}
            onChange={(e) =>
              setNewBook((prev) => ({
                ...prev,
                author: { 
                  id: e.target.value,
                  name: authors.find(author => author.id === e.target.value)?.name || ""
                },
              }))
            }
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Publisher</InputLabel>
          <Select
            value={newBook.publisher.id || ""}
            onChange={(e) =>
              setNewBook((prev) => ({
                ...prev,
                publisher: { 
                  id: e.target.value,
                  name: publishers.find(publisher => publisher.id === e.target.value)?.name || ""
                },
              }))
            }
          >
            {publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={newBook.categories[0]?.id || ""}
            onChange={(e) => {
              const categoryId = e.target.value;
              const categoryName = categories.find(cat => cat.id === categoryId)?.name || "";
              setNewBook((prev) => ({
                ...prev,
                categories: [{ id: categoryId, name: categoryName }],
              }))
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleBookPost}
          sx={{ width: "120px", height: "44px" }}
        >
          Ekle
        </Button>
      </div>

      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          margin: "auto",
          width: "90%",
          paddingTop: "3rem",
        }}
      >
        Kitap Bilgisi Güncelle
      </Typography>

      <div
        className="newBook"
        style={{
          textAlign: "left",
          margin: "auto",
          width: "90%",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          id="update-name"
          label="Kitap Adı"
          variant="standard"
          value={updateBook.name || ""}
          onChange={(e) =>
            setUpdateBook((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <TextField
          id="update-publicationYear"
          label="Yayın Yılı"
          type="number"
          variant="standard"
          value={updateBook.publicationYear || ""}
          onChange={(e) =>
            setUpdateBook((prev) => ({
              ...prev,
              publicationYear: e.target.value,
            }))
          }
        />

        <TextField
          id="update-stock"
          label="Stok"
          type="number"
          variant="standard"
          value={updateBook.stock || ""}
          onChange={(e) =>
            setUpdateBook((prev) => ({ ...prev, stock: e.target.value }))
          }
        />

        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Author</InputLabel>
          <Select
            value={updateBook.author.id || ""}
            onChange={(e) => {
              const authorId = e.target.value;
              const authorName = authors.find(author => author.id === authorId)?.name || "";
              setUpdateBook((prev) => ({
                ...prev,
                author: { id: authorId, name: authorName },
              }))
            }}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Publisher</InputLabel>
          <Select
            value={updateBook.publisher.id || ""}
            onChange={(e) => {
              const publisherId = e.target.value;
              const publisherName = publishers.find(pub => pub.id === publisherId)?.name || "";
              setUpdateBook((prev) => ({
                ...prev,
                publisher: { id: publisherId, name: publisherName },
              }))
            }}
          >
            {publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={updateBook.categories[0]?.id || ""}
            onChange={(e) => {
              const categoryId = e.target.value;
              const categoryName = categories.find(cat => cat.id === categoryId)?.name || "";
              setUpdateBook((prev) => ({
                ...prev,
                categories: [{ id: categoryId, name: categoryName }],
              }))
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleUpdateBook}
          sx={{ width: "120px", height: "44px" }}
        >
          Güncelle
        </Button>
      </div>

      <Typography
        variant="h4"
        style={{
          textAlign: "left",
          margin: "auto",
          width: "90%",
          paddingTop: "6rem",
          paddingBottom: "1rem",
        }}
      >
        Kitaplar
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 650, width: "90%", margin: "auto" }}
      >
        <Table
          sx={{ minWidth: 650, width: "100%", margin: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Kitap adi</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Yayim yili
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Stok
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Yazar
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Yayinevi
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Kategori
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Sil
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Güncelle
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <TableRow
                key={book.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book.name}
                </TableCell>
                <TableCell align="center">{book.publicationYear}</TableCell>
                <TableCell align="center">{book.stock}</TableCell>
                <TableCell align="center">{book.author.name}</TableCell>
                <TableCell align="center">{book.publisher.name}</TableCell>
                <TableCell align="center">
                  {book.categories.map((category) => category.name).join(", ")}
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleBookDelete(book.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <SystemUpdateIcon
                    className="updateBook"
                    onClick={() => handleUpdateForm(book)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {alert && <h1>{alertMessage}</h1>}
    </div>
  );
}

export default Book;