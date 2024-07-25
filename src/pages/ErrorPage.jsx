import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const err = useRouteError()

  return (  
    <div className="flex justify-center items-center flex-col gap-4 py-12 px-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-red-700 size-24"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
      </div>
      <h1 className="text-red-700 font-bold text-3xl md:text-5xl">Error!!! {err.status}</h1>
      <p className="text-2xl">{err.statusText || err.message}</p>
      <p>{err.data}</p>
      <button className="px-3 py-2 rounded-md text-white bg-blue-600 hover:opacity-85 transition-opacity">
        <Link to='/'>Back to Homepage</Link> 
      </button>
    </div>
  );
}

export default ErrorPage;