const Month = (props) => {
  const month = JSON.parse(props.month);
  console.log(month);
  return (
    <>
      <h1>{month.name}</h1>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const url = process.env.API + `months/${context.params.monthID}/`;
  const response = await fetch(url);
  const month = await response.json();
  return { props: { month: JSON.stringify(month) } };
};

export default Month;
