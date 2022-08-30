import React from 'react'
import ContentLoader from 'react-content-loader'

const   CategoryLoader = (props) => {
  return (
    <ContentLoader viewBox="0 0 1000 900" height={900} width={1000} {...props}>
        <rect x="60" y="0" rx="25" ry="50" width="200" height="50" />
        <rect x="270" y="0" rx="25" ry="50" width="200" height="50" />
        <rect x="480" y="0" rx="25" ry="50" width="200" height="50" />
        <rect x="690" y="0" rx="25" ry="50" width="200" height="50" />
        <rect x="0" y="60" rx="25" ry="50" width="200" height="50" />
        <rect x="220" y="60" rx="25" ry="50" width="200" height="50" />
        <rect x="440" y="60" rx="25" ry="50" width="150" height="50" />
        <rect x="610" y="60" rx="25" ry="50" width="200" height="50" />
        <rect x="830" y="60" rx="25" ry="50" width="150" height="50" />
        <rect x="60" y="120" rx="25" ry="50" width="200" height="50" />
        <rect x="270" y="120" rx="25" ry="50" width="200" height="50" />
        <rect x="480" y="120" rx="25" ry="50" width="200" height="50" />
        <rect x="690" y="120" rx="25" ry="50" width="200" height="50" />
       
    </ContentLoader>
  )
}

export default CategoryLoader