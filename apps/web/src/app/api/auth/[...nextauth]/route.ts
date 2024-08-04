import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_AUTH_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_AUTH_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
