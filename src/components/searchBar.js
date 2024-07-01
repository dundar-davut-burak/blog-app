export default function SearchBar() {
  return (
    <form className="py-6 px-12">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
          placeholder="Hangi gönderiyi arıyordunuz ?"
          required
        />
        <button
          type="submit"
          className="text-white font-medium text-sm rounded-lg absolute end-2.5 bottom-2.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-700"
        >
          Ara
        </button>
      </div>
    </form>
  );
}
