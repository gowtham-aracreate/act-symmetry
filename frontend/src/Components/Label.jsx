const Label = ({ htmlFor, children ,text}) => {
  return (
    <>
    <label htmlFor={htmlFor} text={text} className="block text-gray-700 font-medium mb-1">
      {children}
    </label>

    

    </>

  );
};

export default Label;