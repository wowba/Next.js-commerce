import { Inter } from 'next/font/google'
import { useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current !== null) {
      fetch(`/api/add-item?name=${inputRef.current.value}`).then(res => res.json()).then(
        data => alert(data.message)
      )
    }    
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button onClick={handleClick}>add something</button>
      <input ref={inputRef} type='text' placeholder='name' />
    </main>
  )
}
