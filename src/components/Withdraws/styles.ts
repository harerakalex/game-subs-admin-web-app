import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const withdrawStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  })
);
