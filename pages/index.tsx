import Button from '@components/Button'
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current !== null) {
      fetch(`/api/add-item?name=${inputRef.current.value}`).then(res => res.json()).then(
        data => alert(data.message)
      )
    }
  }

  // Notion DB
  // const [products, setProducts] = useState<{ id: string; properties: { id: string; }[]}[]>([])
  // useEffect(() => {
  //   fetch('/api/get-items').then(res => res.json()).then(
  //     data => {
  //       setProducts(data.items)
  //     }
  //   )
  // }, [])

  // prisma, planetscale 
  const [products, setProducts] = useState<{ id: string; name: string; createdAt: string }[]>([])
  useEffect(() => {
    fetch('/api/get-products').then(res => res.json()).then(
      data => {
        setProducts(data.items)
      }
    )
  }, [])

  return (
    <main>
      <button css={css`
        background-color: blue;
        padding: 16px;
        `} onClick={handleClick}>add something</button>
      <Button onClick={handleClick}>add something</Button>
      <input className='placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' ref={inputRef} type='text' placeholder='name' />
      <div>
        <p>Products List</p>
        {/* Notion DB */}
        {/* {products && products.map((item, idx: number) => {
          return (
            <div key={idx}>
              {JSON.stringify(item)}
              {item.properties &&
                Object.entries(item.properties).map(([key, value]) => (
                  <button key={key} onClick={() => {
                    fetch(`/api/get-detail?pageId=${item.id}&propertyId=${value.id}`)
                    .then((res) => res.json())
                    .then((data) => alert(JSON.stringify(data.items)))
                  }} >{key}</button>
                )
                )}
              <br />
              <br />
            </div>
          )
        })} */}

        {/* Planestscale DB */}
        {products &&
          products.map((item) => <div key={item.id}>{item.name}<p>{item.createdAt}</p></div>)}
      </div>

    </main>
  )
}
