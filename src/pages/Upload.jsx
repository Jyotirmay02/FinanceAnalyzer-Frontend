import React, { useState } from 'react'
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { uploadFiles } from '../services/api'

const Upload = () => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState(null)

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    setUploadResult(null)
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    try {
      const result = await uploadFiles(files)
      setUploadResult({ success: true, data: result })
    } catch (error) {
      setUploadResult({ 
        success: false, 
        error: error.response?.data?.detail || 'Upload failed' 
      })
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Bank Statements</h1>
        <p className="text-gray-600">Upload your bank statement files for analysis</p>
      </div>

      <div className="card">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Choose bank statement files
          </h3>
          <p className="text-gray-600 mb-4">
            Supported formats: XLS, XLSX, CSV
          </p>
          <input
            type="file"
            multiple
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="btn-primary cursor-pointer inline-block"
          >
            Select Files
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Selected Files ({files.length})
            </h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload & Analyze'}
              </button>
            </div>
          </div>
        )}

        {uploadResult && (
          <div className={`mt-6 p-4 rounded-lg ${
            uploadResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {uploadResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <div>
                {uploadResult.success ? (
                  <div>
                    <p className="text-green-800 font-medium">Upload Successful!</p>
                    <p className="text-green-700 text-sm">
                      Analysis ID: {uploadResult.data.analysis_id}
                    </p>
                  </div>
                ) : (
                  <p className="text-red-800">{uploadResult.error}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Banks</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak', 'PNB', 'BOB', 'Canara Bank'].map((bank) => (
            <div key={bank} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{bank}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Upload
