import React from 'react'

function SummaryPreview({ resumeInfo }) {
  const summary = resumeInfo?.summary || resumeInfo?.attributes?.summary;

  return (
    <p className='text-xs'>{summary}</p>
  )
}

export default SummaryPreview;