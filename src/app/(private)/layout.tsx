import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { createOrUpsertUserService } from '@/services/user/get_current_user'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/signin')
  }

  const primaryEmail = user.emailAddresses[0]?.emailAddress

  if (primaryEmail) {
    
    await createOrUpsertUserService(primaryEmail)
  }

  return <>{children}</>
}
