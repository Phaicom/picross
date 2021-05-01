import { onGlobalSetup, provide } from '@nuxtjs/composition-api'

export default () => {
  onGlobalSetup(() => {
    const theme = {
      light: {
        '--primary-color': '#606060',
        '--secondary-color': '#142f64',
        '--tertiary-color': '#bdbdbd',
        '--bg-color': '#fff',
      },
      dark: {
        '--primary-color': '#fafafa',
        '--secondary-color': '#61AFEF',
        '--tertiary-color': '#E5C07B',
        '--bg-color': '#333842',
      },
      sepia: {
        '--primary-color': '#383a42',
        '--secondary-color': '#0a4fa7',
        '--tertiary-color': '#288120',
        '--bg-color': '#f4ecd8',
      },
    }
    provide('$themes', theme)
  })
}
