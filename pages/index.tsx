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
      <button onClick={handleClick}>add something</button>
      <input ref={inputRef} type='text' placeholder='name' />

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
