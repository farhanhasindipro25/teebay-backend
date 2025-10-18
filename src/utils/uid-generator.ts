export function generateUID(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  const secondRandomStr = Math.random().toString(36).substring(2, 15);
  
  return `${timestamp}-${randomStr}-${secondRandomStr}`;
}
