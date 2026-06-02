import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'salesLight',
    themes: {
      salesLight: {
        dark: false,
        colors: {
          background: '#F6F8FC',
          surface: '#FFFFFF',
          primary: '#0D47A1',
          secondary: '#D32F2F',
          accent: '#D32F2F',
          error: '#C62828',
          info: '#1565C0',
          success: '#2E7D32',
          warning: '#ED6C02',
          'on-background': '#102A43',
          'on-surface': '#102A43',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-accent': '#FFFFFF',
        },
      },
      salesDark: {
        dark: true,
        colors: {
          background: '#08111F',
          surface: '#102033',
          primary: '#0D47A1',
          secondary: '#D32F2F',
          accent: '#D32F2F',
          error: '#EF5350',
          info: '#64B5F6',
          success: '#66BB6A',
          warning: '#FFB74D',
          'on-background': '#F4F7FB',
          'on-surface': '#F4F7FB',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-accent': '#FFFFFF',
        },
      },
    },
  },
})