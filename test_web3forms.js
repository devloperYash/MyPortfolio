async function test() {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'b3f7ca7b-55e8-4bdf-a187-e3e56ad6a6ed',
        name: 'Test Bot',
        email: 'test@example.com',
        message: 'Hello, this is a test message to verify Web3Forms setup.',
      }),
    });
    console.log('Response Status:', res.status);
    const text = await res.text();
    console.log('Response Text length:', text.length);
    console.log('Response Text snippet:', text.slice(0, 500));
  } catch (err) {
    console.error('Error during fetch:', err);
  }
}
test();
