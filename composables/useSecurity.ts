export const useSecurity = () => {
  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, '')
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const hashData = async (data: string) => {
    const encoder = new TextEncoder()
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data))
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  return {
    sanitizeInput,
    validateEmail,
    validateUrl,
    hashData
  }
} 