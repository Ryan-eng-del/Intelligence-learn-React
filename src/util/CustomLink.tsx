import React from 'react'
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

export const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  return (
    <div>
      <Link
        style={{
          textDecoration: match ? 'underline' : 'none',
          backgroundColor: match ? '#d3dedc' : '',
          display: 'block',
          color: 'black'
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  )
}
