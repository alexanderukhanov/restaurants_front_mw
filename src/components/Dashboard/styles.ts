import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = createStyles({
    media: {
        marginTop: 10,
        objectFit: 'contain',
        maxWidth: 250,
        maxHeight: 120,
    },

    fieldsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0px'
    },

    addDishBlock: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0px'
    },

    divider: {
        width: '70%',
        height: 3,
        margin: '20px 0px',
        backgroundColor: '#362bc1',
        borderRadius: '50%',
    }

});

const useStyles = makeStyles(styles);

export default useStyles;
