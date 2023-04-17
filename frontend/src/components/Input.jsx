const Input = ({ name, type, onChange, value }) => {
  return (
    <>
      <label
        className="block mb-2 mt-3 font-medium text-white"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        name={name}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={onChange}
        value={value}
        alt="form input"
      ></input>
    </>
  );
};

export default Input;
