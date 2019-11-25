import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    <li>
      <Link href="/a">
        <a>a页面</a>
      </Link>
    </li>
    <li>
      <Link href="/b" as="/path-b">
        <a>b页面</a>
      </Link>
    </li>
  </ul>
)
