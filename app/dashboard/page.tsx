"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { auth, db } from "../firebase"
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import ViewDocumentModal from "../components/ViewDocumentModal"
import ShareDocumentModal from "../components/ShareDocumentModal"

interface Document {
  id: string
  name: string
  type: string
  uploadDate: {
    seconds: number
    nanoseconds: number
  }
  content?: string
}

export default function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!auth.currentUser) return

      const q = query(collection(db, "documents"), where("userId", "==", auth.currentUser.uid))
      const querySnapshot = await getDocs(q)
      const docs = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Document,
      )
      setDocuments(docs)
    }

    fetchDocuments()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "documents", id))
      setDocuments(documents.filter((doc) => doc.id !== id))
    } catch (error) {
      console.error("Error deleting document:", error)
    }
  }

  const handleView = (document: Document) => {
    setSelectedDocument(document)
    setIsViewModalOpen(true)
  }

  const handleShare = (document: Document) => {
    setSelectedDocument(document)
    setIsShareModalOpen(true)
  }

  const formatDate = (date: { seconds: number; nanoseconds: number }) => {
    return new Date(date.seconds * 1000).toLocaleDateString()
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Documents</h2>
          <Link
            href="/upload"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Upload New Document
          </Link>
        </div>
        {documents.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Document Name</th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Upload Date</th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="border-b border-gray-300 px-4 py-2">{doc.name}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{doc.type}</td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {doc.uploadDate ? formatDate(doc.uploadDate) : "N/A"}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <button onClick={() => handleView(doc)} className="text-blue-500 hover:text-blue-700 mr-2">
                        View
                      </button>
                      <button onClick={() => handleShare(doc)} className="text-green-500 hover:text-green-700 mr-2">
                        Share
                      </button>
                      <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedDocument && (
        <ViewDocumentModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          document={selectedDocument}
        />
      )}
      {selectedDocument && (
        <ShareDocumentModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          document={selectedDocument}
        />
      )}
    </div>
  )
}

