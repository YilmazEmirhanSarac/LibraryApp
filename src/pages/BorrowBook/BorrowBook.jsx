import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./BorrowBook.css";
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

const initialBorrowBook = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  book: {},
};

function BorrowBook() {
  const [updateBorrowBook, setUpdateBorrowBook] = useState(initialBorrowBook);
  const [newBorrowBook, setNewBorrowBook] = useState(initialBorrowBook);
  const [books, setBooks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [borrowBook, setBorrowBook] = useState(null);

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/api/v1/borrows"
      );
      setBorrowBook(res.data);
      console.log(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/books`
      );
      setBooks(booksResponse.data);
    };
    fetchData();
  }, []);

  // post
  const handleBorrowBookPost = async () => {
    if (!newBorrowBook.book) {
      handleAlert("Lütfen bir kitap seçin!");
      return;
    }
  
    const bookToSend = {
      borrowerName: newBorrowBook.borrowerName,
      borrowerMail: newBorrowBook.borrowerMail,
      borrowingDate: newBorrowBook.borrowingDate,
      returnDate: newBorrowBook.returnDate || null,
      bookForBorrowingRequest: {
        id: newBorrowBook.book?.id || 0,  
        name: newBorrowBook.book?.name || "",
        publicationYear: newBorrowBook.book?.publicationYear || 0,
        stock: newBorrowBook.book?.stock || 0,
      },
    };
  
    await axios
      .post(import.meta.env.VITE_BASE_URL + "/api/v1/borrows", bookToSend)
      .then(() => {
        setUpdate(false);
        setNewBorrowBook(initialBorrowBook);
        handleAlert("Kitap alındı!");
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
  const handleBorrowBookDelete = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL + `/api/v1/borrows/${id}`
      );
      handleAlert("Kitap iade edildi");
      setUpdate(false);
    } catch (err) {
      console.error(err);
      handleAlert("Kitap iade islemi basarisiz");
    }
  };

  const handleUpdateForm = (borrowBook) => {
    // Make sure to preserve the structure needed for the form
    setUpdateBorrowBook({
      ...borrowBook,
      borrowerName: borrowBook.borrowerName,
      borrowerMail: borrowBook.borrowerMail,
      borrowingDate: borrowBook.borrowingDate,
      returnDate: borrowBook.returnDate,
      book: borrowBook.bookForBorrowingRequest,
    });
  };

  const hanldeUpdateBorrowBook = async () => {
    try {
      // Format data for the PUT request
      const bookToUpdate = {
        borrowerName: updateBorrowBook.name,
        borrowerMail: updateBorrowBook.borrowerMail,
        borrowingDate: updateBorrowBook.borrowingDate,
        returnDate: updateBorrowBook.returnDate,
        bookForBorrowingRequest: {
          id: updateBorrowBook.book.id,
          name: updateBorrowBook.book.name,
          publicationYear: updateBorrowBook.book.publicationYear,
          stock: updateBorrowBook.book.stock,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/borrows/${
          updateBorrowBook.id
        }`,
        bookToUpdate
      );

      setUpdateBorrowBook(initialBorrowBook);
      handleAlert("Güncelleme işlemi başarılı");
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
        Kitap Al
      </Typography>

      <div
        className="newBorrowBook"
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
          label="Ad soyad"
          variant="standard"
          value={newBorrowBook.borrowerName}
          onChange={(e) =>
            setNewBorrowBook((prev) => ({
              ...prev,
              borrowerName: e.target.value,
            }))
          }
        />

        <TextField
          id="publicationYear"
          label="Mail"
          type="mail"
          variant="standard"
          value={newBorrowBook.borrowerMail}
          onChange={(e) =>
            setNewBorrowBook((prev) => ({
              ...prev,
              borrowerMail: e.target.value,
            }))
          }
        />

        <TextField
          id="stock"
          label="-"
          type="date"
          variant="standard"
          value={newBorrowBook.borrowingDate}
          onChange={(e) =>
            setNewBorrowBook((prev) => ({
              ...prev,
              borrowingDate: e.target.value,
            }))
          }
        />

        <TextField
          id="stock"
          label="-"
          type="date"
          variant="standard"
          value={newBorrowBook.returnDate}
          onChange={(e) =>
            setNewBorrowBook((prev) => ({
              ...prev,
              returnDate: e.target.value,
            }))
          }
        />

        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Book</InputLabel>
          <Select
            value={newBorrowBook.book.id || ""}
            onChange={(e) =>
              setNewBorrowBook((prev) => ({
                ...prev,
                book: {
                  id: e.target.value,
                  name:
                    books.find((books) => books.id === e.target.value)?.name ||
                    "",
                },
              }))
            }
          >
            {books.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleBorrowBookPost}
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
        Kitap Alma Bilgisi Guncelle
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
          label="Ad Soyad"
          variant="standard"
          value={updateBorrowBook.name || ""}
          onChange={(e) =>
            setUpdateBorrowBook((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <TextField
          id="update-publicationYear"
          label="Mail"
          type="mail"
          variant="standard"
          value={updateBorrowBook.mail || ""}
          onChange={(e) =>
            setUpdateBorrowBook((prev) => ({
              ...prev,
              mail: e.target.value,
            }))
          }
        />

        <TextField
          id="update-stock"
          label="-"
          type="date"
          variant="standard"
          value={updateBorrowBook.borrowingDate || ""}
          onChange={(e) =>
            setUpdateBorrowBook((prev) => ({ ...prev, stock: e.target.value }))
          }
        />

        <TextField
          id="update-stock"
          label="-"
          type="date"
          variant="standard"
          value={updateBorrowBook.returnDate || ""}
          onChange={(e) =>
            setUpdateBorrowBook((prev) => ({ ...prev, stock: e.target.value }))
          }
        />

        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Book</InputLabel>
          <Select
            value={updateBorrowBook.book.id || ""}
            onChange={(e) => {
              const bookId = e.target.value;
              const bookName =
                books.find((book) => book.id === bookId)?.name || "";
              setUpdateBorrowBook((prev) => ({
                ...prev,
                book: { id: bookId, name: bookName },
              }));
            }}
          >
            {books.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={hanldeUpdateBorrowBook}
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
              <TableCell sx={{ fontWeight: 600 }}>Odunc alan adi</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                e posta
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                alma tarihi
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                iade tarihi
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                kitap
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
            {borrowBook?.map((borrow) => (
              <TableRow
                key={borrow.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {borrow.borrowerName}
                </TableCell>
                <TableCell align="center">{borrow.borrowerMail}</TableCell>
                <TableCell align="center">{borrow.borrowingDate}</TableCell>
                <TableCell align="center">{borrow.returnDate}</TableCell>
                <TableCell align="center">{borrow.book.name}</TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleBorrowBookDelete(borrow.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <SystemUpdateIcon
                    className="updateBorrow"
                    onClick={() => hanldeUpdateBorrowBook(borrow)}
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

export default BorrowBook;
