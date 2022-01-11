import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        flexGrow: 1,
        cursor: 'pointer'
    },

});

const useStyles = makeStyles(styles);

export default useStyles;
