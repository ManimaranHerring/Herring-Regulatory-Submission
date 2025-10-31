import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import SequenceWorkspace from './pages/SequenceWorkspace'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: 20 }}>
            <h2>Reg Submission Frontend</h2>
            <p>Go to a sequence:</p>
            <p><code>/sequence/&lt;sequence-id&gt;</code></p>
          </div>
        } />
        <Route path="/sequence/:sequenceId" element={<SequenceWorkspace />} />
      </Routes>
    </>
  )
}
