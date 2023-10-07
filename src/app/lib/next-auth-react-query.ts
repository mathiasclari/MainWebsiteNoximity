import { useQuery } from "react-query"
import { redirect } from "next/navigation"

export async function fetchSession() {
  const res = await fetch("/api/auth/session")
  const session = await res.json()
  if (Object.keys(session).length) {
    return session
  }
  return null
}

export function useSession({
  required,
  redirectTo = "/api/auth/signin?error=SessionExpired",
  queryConfig = {},
} = {}) {
  const query = useQuery(["session"], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error)
      if (data || !required) return
      redirect(redirectTo);
    },
  })
  return [query.data, query.status === "loading"]
}