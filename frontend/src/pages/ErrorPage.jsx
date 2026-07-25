import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white px-4">

      <h1 className="text-9xl font-extrabold text-blue-600">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-6">
        Page Not Found
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-3 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
      >
        Go Home
      </Link>

    </div>
  );
}

export default ErrorPage;