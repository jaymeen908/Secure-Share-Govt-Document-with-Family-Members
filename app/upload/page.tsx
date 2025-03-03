"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function UploadDocument() {
  const [documentName, setDocumentName] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) {
      console.error("User not authenticated")
      return
    }

    try {
      const docRef = await addDoc(collection(db, "documents"), {
        userId: auth.currentUser.uid,
        name: documentName,
        type: documentType,
        uploadDate: serverTimestamp(),
        content: `This is a sample content for ${documentName}. In a real application, this would be the actual content of the uploaded document.`,
        sharedWith: [],
      })

      console.log("Document uploaded with ID:", docRef.id)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error uploading document:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Document</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">
              Document Name
            </label>
            <input
              type="text"
              id="documentName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
              Document Type
            </label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a type</option>
              <option value="Identity">Identity</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

