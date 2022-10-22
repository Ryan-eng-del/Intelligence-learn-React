import React from 'react'
export const str2DOM = (str: string) => (
  <div dangerouslySetInnerHTML={{ __html: str }} />
)
