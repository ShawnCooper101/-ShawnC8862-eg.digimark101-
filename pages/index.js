export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>OpenAI API Handler</h1>
      <p>This is a Next.js application with an OpenAI API endpoint.</p>
      <h2>API Endpoint</h2>
      <p>POST to <code>/api/ask</code> with a JSON body containing a <code>question</code> field.</p>
      <h3>Example Request:</h3>
      <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
{`{
  "question": "What is Next.js?"
}`}
      </pre>
      <h3>Example Response:</h3>
      <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
{`{
  "answer": "Next.js is a React framework..."
}`}
      </pre>
      <p>See the <a href="https://github.com/ShawnCooper101/-ShawnC8862-eg.digimark101-">README</a> for more details.</p>
    </div>
  );
}
