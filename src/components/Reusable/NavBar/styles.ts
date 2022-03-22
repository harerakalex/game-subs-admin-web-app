import { makeStyles, Theme } from '@material-ui/core/styles';

export const DashboardLayoutStyles = makeStyles((theme: Theme) => ({
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%'
  },
  userInfoWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    color: 'black'
  }
}));
