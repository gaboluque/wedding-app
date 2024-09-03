import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`home flex justify-center ${inter.className}`}>
      Home
    </main>
  )
}
