const AccessDenied: React.FC = () => {
  return (
    <div className="centered focused gen-message">
      <p>
        You are not authorized to access this page unless logged in. Please
        login and try again
      </p>
    </div>
  );
};

export default AccessDenied;
