import Link from "next/link"

export const MainLink = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a className="px-2 text-sky-600 hover:underline">{children}</a>
    </Link>
  )
}

export const NavLink = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a className="ease my-2 rounded border border-gray-200 p-2 text-center font-semibold text-gray-800 hover:text-sky-600 hover:shadow-sm">
        {children}
      </a>
    </Link>
  )
}
