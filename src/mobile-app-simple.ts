import { createApp, h } from 'vue';
import { Quasar, Notify } from 'quasar';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Simple test component
const TestApp = {
  setup() {
    return () => h('div', {
      style: {
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif'
      }
    }, [
      h('h1', 'Gush Zone Mobile App'),
      h('p', 'Mobile app is working!'),
      h('button', {
        onClick: () => {
          Notify.create({
            type: 'positive',
            message: 'Mobile app is working correctly!',
            position: 'top'
          });
        },
        style: {
          padding: '10px 20px',
          backgroundColor: '#1976D2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }
      }, 'Test Notification')
    ]);
  }
};

// Create and mount the app
const app = createApp(TestApp);

app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    brand: {
      primary: '#1976D2',
      secondary: '#26A69A',
      accent: '#9C27B0',
      dark: '#1D1D1D',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
});

app.mount('#app');
