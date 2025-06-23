export const handleSearch = (data, searchValue) => {
  const trimmed = searchValue.trim();

  if (trimmed === "") return data;

  return data.filter((e) =>
    e.name.toLowerCase().includes(trimmed.toLowerCase())
  );
};
