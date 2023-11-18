import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    // Définissez les couleurs principales utilisées dans toute l'application
    primary: {
      light: '#7986cb',
      main: '#556cd6',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    background: {
      default: '#2b75bf', // Une couleur de fond par défaut pour l'application
      paper: '#ffffff', // La couleur de fond pour les composants qui ont un fond, comme les cartes et les boîtes de dialogue
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
    // Vous pouvez également définir d'autres couleurs comme l'erreur, le warning, etc.
    error: {
      main: '#f44336',
    },
    // ... autres couleurs
  },
  typography: {
    // Personnalisez la typographie
    fontFamily: ['Open Sans', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    // ... autres styles de typographie pour h2, h3, body1, etc.
  },
  components: {
    // Personnalisation des composants spécifiques
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#2b75bf',
          borderRadius: 8, // Boutons avec des coins arrondis
        },
      },
    },
    // ... autres composants comme MuiAppBar, MuiCard, etc.
  },
  // Ajoutez d'autres personnalisations globales ici
  // Par exemple, pour modifier les ombres, les transitions, les z-index, etc.
})

export default theme
