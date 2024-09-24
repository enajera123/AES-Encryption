'use client'
import React from 'react'
import CryptoJS from 'crypto-js'

function Encryption() {
    const [secretKey, setSecretKey] = React.useState('')
    const [data, setData] = React.useState('')
    const [encrypt, setEncrypt] = React.useState(false)
    const [result, setResult] = React.useState('')
    const copyText = () => {
        navigator.clipboard.writeText(result)
    }
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
        <div className='text-white mt-10 p-4 md:w-1/2 mx-auto bg-gray-800 rounded-lg shadow-lg'>
            <textarea
                className='bg-gray-700 text-white p-2 w-full mb-4 rounded-lg border focus:outline-none border-none '
                onChange={(e) => setData(e.target.value)}
                placeholder='Write your data'
                rows={4}
            ></textarea>
            <input
                className='bg-gray-700 text-white p-2 w-full mb-4 rounded-lg border focus:outline-none border-none '
                onChange={(e) => setSecretKey(e.target.value)}
                type="password"
                placeholder='Secret key'
            />
            <div className='block md:flex justify-between gap-5 mb-4'>
                <button
                    className={`bg-red-500 w-full text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ${!encrypt ? 'md:bg-red-600' : ''}`}
                    onClick={handleDecrypt}
                >
                    Decrypt
                </button>
                <button
                    className={`bg-green-500 w-full text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${encrypt ? 'md:bg-green-600' : ''}`}
                    onClick={handleEncrypt}
                >
                    Encrypt
                </button>
            </div>
            <div onClick={copyText} className='bg-gray-700 p-4 rounded-lg'>
                <p className='break-words'>{result}</p>
            </div>
        </div>
    )
}

export default Encryption