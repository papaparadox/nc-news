export default function ErrorComponent({ message }) {
  return (
    <div className='error-container'>
      <h1 className='error-title'>Error</h1>
      <h2 className='error-message'>{message}</h2>
    </div>
  );
}
