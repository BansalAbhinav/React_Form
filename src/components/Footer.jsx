import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="mt-auto ">
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 4,
          px: 2,
          mt: "auto",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link
              href="/about"
              color="inherit"
              underline="hover"
              display="block"
            >
              About
            </Link>
            <Link
              href="/services"
              color="inherit"
              underline="hover"
              display="block"
            >
              Services
            </Link>
            <Link
              href="/contact"
              color="inherit"
              underline="hover"
              display="block"
            >
              Contact
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body1">Clement Town</Typography>
            <Typography variant="body1">Dehradun,India</Typography>
            <Typography variant="body1">
              Email: Abhinavbansal@gmail.com
            </Typography>
            <Typography variant="body1">Phone: (+91) 9410710004</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            mt: 4,
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
