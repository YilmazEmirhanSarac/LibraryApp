import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {
  Link
} from "react-router-dom";


const pages = [{
    name: 'Anasayfa',
    link: '/',
    },
    {
    name: 'Yazarlar',
    link: '/authors',
    },
    {
    name: 'Kitaplar',
    link: '/books',
    },
    {
    name: 'Kategoriler',
    link: '/categories',
    },
    {
    name: 'Yayınevleri',
    link: '/publishers',
    },
    {
    name: 'Kitap Odunc Al',
    link: '/borrow',
    },
];
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={{ width: "95%"}}>
        <Toolbar disableGutters>
        <LibraryBooksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library
          </Typography>
     
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
              >
                <Link to={page.link} style={{color : 'white', textDecoration : 'none', fontWeight : '500'}} >{page.name} </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;