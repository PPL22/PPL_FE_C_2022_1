import React from 'react';

function DropdownSearch({ id, label, type, options, innerRef }) {
  const [value, setValue] = React.useState('');
  const [name, setName] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  const handleChange = (e) => {
    const keyword = e.target.value;
    setName(keyword);
    setValue('');
    if (keyword) {
      setTimeout(() => {
        const getNama = options.filter((option) => option.nama === keyword);
        if (getNama.length > 0) {
          setValue(getNama[0].value);
        } else {
          const filter = options.filter((option) => {
            // regex keywords start with option
            const regex = new RegExp(`^${keyword}`, 'gi');
            return option.nama.match(regex);
          });
          setFilteredOptions(filter);
        }
      }, 1000);
    }
  };

  const clickOption = (data) => {
    setValue(data.nip);
    setName(data.nama);
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <div className="w-full h-24">
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
        <input type="hidden" value={value} ref={innerRef} />
        <input
          type={type}
          id={id}
          autoComplete="off"
          onChange={handleChange}
          placeholder="Cari Dosen Wali"
          value={name}
          className="p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="absolute top-20 left-0 right-0 z-10">
        <ul
          className={`bg-blue-50 rounded-lg ${
            filteredOptions.length > 0 && 'h-48'
          } overflow-y-auto`}
        >
          {filteredOptions.map((option, index) => {
            return (
              <li
                onClick={() => clickOption(option)}
                key={index}
                className="p-4 text-gray-900 hover:bg-gray-100 text-sm"
              >
                {option.nama}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DropdownSearch;
