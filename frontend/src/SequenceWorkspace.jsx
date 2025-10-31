import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function SequenceWorkspace() {
  const { sequenceId } = useParams()
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    axios.get(`http://localhost:3000/sequences/${sequenceId}`)
      .then(res => {
        setData(res.data)
      })
      .finally(() => setLoading(false))
  }, [sequenceId])

  if (loading) return <p style={{ padding: 20 }}>Loading…</p>
  if (!data) return <p style={{ padding: 20 }}>Not found</p>

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left: tree */}
      <div style={{ width: 280, borderRight: '1px solid #ddd', padding: 10, overflow: 'auto' }}>
        <h4>{data.application?.region} / {data.application?.format}</h4>
        <ul>
          {data.tree.map(node => (
            <li key={node.id}>{node.code} - {node.title}</li>
          ))}
        </ul>
      </div>

      {/* Center */}
      <div style={{ flex: 1, padding: 10 }}>
        <h3>
          App: {data.application?.application_number || data.application?.id} – Seq {data.sequence_number}
        </h3>
        <p>Status: {data.status}</p>
        <p>Validation: {data.validation_status}</p>
        <p>This is where upload / AI etc will come.</p>
      </div>

      {/* Right */}
      <div style={{ width: 320, borderLeft: '1px solid #ddd', padding: 10 }}>
        <h4>Validation runs</h4>
        <p>None</p>
      </div>
    </div>
  )
}
