import React from 'react';

export default function XAxis({start, end, stroke}) {
  return (
    <polyline fill="none" stroke="#000000" strokeWidth={stroke} points={start + " " + end} />
  )
}