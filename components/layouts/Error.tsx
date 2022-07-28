const Error = ({ error, clearError }) => {
  return error.detail ? (
    <>
      {
        <div>
          <p>{error.detail} </p> <button onClick={clearError}>X</button>
        </div>
      }
    </>
  ) : null;
};

export default Error;
