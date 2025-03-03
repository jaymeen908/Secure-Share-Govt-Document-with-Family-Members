import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Secure & Share Govt Documents</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Safely store and share your important government documents with ease.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

