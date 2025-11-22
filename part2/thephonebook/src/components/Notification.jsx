export const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return (
    <div 
      className="error" 
      style={{
        color: color === 'green' ? 'green' : 'red',
      }}
    >
      {message}
    </div>
  );
};
