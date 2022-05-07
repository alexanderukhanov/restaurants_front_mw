import { Grid, Typography } from '@mui/material';
import Image from '../../assets/to_be_continued.jpg';

const About = () => (
    <Grid sx={{
        height: '96vh',
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <Typography id="title-about" sx={{textAlign: 'center', fontSize: '25px'}}>
            About
        </Typography>
        <Grid container justifyContent='center' alignItems='center'
              sx={{height: '50vh', textAlign: 'center'}}>
            <Grid item sx={{
                margin: '0 10px',
                color: '#ffffff',
                fontWeight: 'bold',
                textShadow: `10px 0px 20px #f3c4c4`,
                lineHeight: '28px',
            }}>
                This project was done for reviewing wage and gain experience overall. Also I have expectations that
                CTO or Maximus
                will
                parse it meticulously and give me pieces of advice for further development.
            </Grid>
        </Grid>
    </Grid>
);

export default About;
