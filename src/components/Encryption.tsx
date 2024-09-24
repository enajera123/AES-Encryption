'use client'
import React from 'react'
import CryptoJS from 'crypto-js'

function Encryption() {
    const [secretKey, setSecretKey] = React.useState('')
    const [data, setData] = React.useState('')
    const [encrypt, setEncrypt] = React.useState(false)
    const [result, setResult] = React.useState('')

    const handleEncrypt = () => {
        try {
            const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString()
            setResult(encryptedData)
            setEncrypt(true)
        } catch (error) {
            console.error('Error encrypting data:', error)
            setResult('Error encrypting data')
        }
    }

    const handleDecrypt = () => {
        try {
            const bytes = CryptoJS.AES.decrypt(data, secretKey)
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
            if (!decryptedData) {
                throw new Error('Failed to decrypt data')
            }
            setResult(decryptedData)
            setEncrypt(false)
        } catch (error) {
            console.error('Error decrypting data:', error)
            setResult('Error decrypting data')
        }
    }

    return (
        <div className='text-white mt-10 p-4 bg-gray-800 rounded-lg shadow-lg'>
            <textarea
                className='text-black p-2 w-full mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setData(e.target.value)}
                placeholder='Write your data'
                rows={4}
            ></textarea>
            <input
                className='text-black p-2 w-full mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setSecretKey(e.target.value)}
                type="text"
                placeholder='Secret key'
            />
            <div className='block md:flex justify-between gap-5 mb-4'>
                <button
                    className='bg-red-500 w-full text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                    onClick={handleDecrypt}
                >
                    Decrypt
                </button>
                <button
                    className='bg-green-500 w-full mt-2 md:mt-0 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
                    onClick={handleEncrypt}
                >
                    Encrypt
                </button>
            </div>
            <div className='bg-gray-700 p-4 rounded-lg'>
                <p className='break-words'>{result}</p>
            </div>
        </div>
    )
}

export default Encryption