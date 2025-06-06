import { createApp } from 'vue';

console.log('Mobile app debug script starting...');

// Simple test component
const TestApp = {
  template: `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif; background: #f5f5f5; min-height: 100vh;">
      <h1 style="color: #1976D2;">Mobile App Debug Test</h1>
      <p>If you can see this, Vue is working!</p>
      <button @click="testClick" style="padding: 10px 20px; background: #1976D2; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 10px;">
        Test Click
      </button>
      <div style="margin-top: 20px;">
        <p>Clicks: {{ clickCount }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      clickCount: 0
    };
  },
  methods: {
    testClick() {
      this.clickCount++;
      console.log('Button clicked! Count:', this.clickCount);
      alert(`Button clicked ${this.clickCount} times!`);
    }
  },
  mounted() {
    console.log('Vue component mounted successfully!');
  }
};

console.log('Creating Vue app...');

try {
  const app = createApp(TestApp);
  console.log('Vue app created, mounting...');
  
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue error:', err, info);
    alert('Vue error: ' + err.message);
  };
  
  app.mount('#app');
  console.log('Vue app mounted successfully!');
} catch (error) {
  console.error('Error creating/mounting Vue app:', error);
  alert('Error: ' + error.message);
}
