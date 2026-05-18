import Hero from '../components/Hero'
import WhatIDo from '../components/WhatIDo'
import Experience from '../components/Experience'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="border-t border-border" />
      <WhatIDo />
      <div className="border-t border-border" />
      <Experience />
    </main>
  )
}
