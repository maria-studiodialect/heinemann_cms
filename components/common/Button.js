import clsx from 'clsx'
import React, { Children } from 'react'

export default React.forwardRef(function Button(
  {
    variant = 'primary',
    loading = false,
    loadingText = 'loading...',
    children,
    ...attributes
  },
  ref
) {
  const handleClick = (e) => {
    if (!loading && attributes.onClick) {
      attributes.onClick(e)
    }
  }

  const variantClassname = clsx({
    ['bg-black text-white disabled:bg-gray-100 disabled:text-black']:
      variant === 'primary',
    ['text-black bg-gray-100 disabled:text-sky-400']: variant === 'text',
  })

  return (
    <button
      {...attributes}
      className={clsx(
        'inline-block cursor-pointer rounded-full px-4 py-1.5 leading-snug ring-gray-300 transition duration-150 ease-in-out hover:ring-2 focus:ring-2',
        variantClassname,
        attributes.className
      )}
      disabled={attributes.disabled || loading}
      ref={ref}
      onClick={handleClick}
    >
      {loading
        ? loadingText
        : Children.map(children, (child, i) => {
            return (
              <span key={i} className="mr-xsmall last:mr-0">
                {child}
              </span>
            )
          })}
    </button>
  )
})
