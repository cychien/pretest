import * as React from 'react'

export function createContext({ displayName, errorMessage }) {
  const Context = React.createContext(undefined)

  Context.displayName = displayName

  function useContext() {
    const context = React.useContext(Context)

    if (!context) {
      throw new Error(errorMessage)
    }

    return context
  }

  return [Context.Provider, useContext]
}
