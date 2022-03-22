import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const usersStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    searchBoxContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    filterContainer: {
      width: '100%'
    },
    searchContainer: {
      width: '70%'
    }
  })
);
