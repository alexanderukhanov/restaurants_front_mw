import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Image from '../../assets/background_login.jpeg';

const styles = createStyles({
    headerWrapper: {
        width: '100%',
        height: "calc(100vh - 56px)",
        margin: 0,
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
    },

    helperText: {
        fontWeight: 700,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'rgb(130,86,86)',
        borderRadius: 15,
    }
});

const useStyles = makeStyles(styles);

export default useStyles;
