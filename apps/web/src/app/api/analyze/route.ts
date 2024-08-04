import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const mealId = searchParams.get('mealId')
}
