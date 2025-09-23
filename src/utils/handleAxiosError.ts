import { AxiosError } from "axios"

export async function handleAxiosError<T>(
  axiosCall: () => Promise<T>
): Promise<T> {
  try {
    return await axiosCall()
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}
