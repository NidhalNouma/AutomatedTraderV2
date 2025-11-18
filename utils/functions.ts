/**
 * Repeatedly runs a function until the expected response is returned
 * or the maximum number of attempts is reached.
 *
 * @param func - The function to execute.
 * @param isDesiredResponse - A function that validates the response, or a value to compare to.
 * @param args - Positional arguments for the function.
 * @param maxAttempts - Maximum number of attempts.
 * @param delaySeconds - Delay (in seconds) between attempts.
 * @param skipFirstAttempt - Whether to skip calling the function on the first loop.
 * @returns The successful response, or the last response if attempts are exhausted.
 */
export async function retryUntilResponse<T>(
  func: (...args: any[]) => Promise<T> | T,
  isDesiredResponse: ((response: T) => boolean) | T,
  args: any[] = [],
  maxAttempts: number = 3,
  delaySeconds: number = 5,
  skipFirstAttempt: boolean = false
): Promise<T | null> {
  let lastResponse: T | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (skipFirstAttempt && attempt === 1) {
      console.log(`⏭️ Skipping first call on attempt ${attempt}`);
    } else {
      try {
        const response = await func(...args);
        lastResponse = response;

        let success = false;

        if (typeof isDesiredResponse === "function") {
          success = (isDesiredResponse as (r: T) => boolean)(response);
        } else {
          success = response === isDesiredResponse;
        }

        if (success) {
          console.log(`✅ Success on attempt ${attempt}`);
          return response;
        }

        console.log(
          `⚠️ Attempt ${attempt} failed. Retrying in ${delaySeconds} seconds...`
        );
      } catch (error) {
        console.log(
          `⚠️ Attempt ${attempt} threw an error: ${error}. Retrying in ${delaySeconds} seconds...`
        );
      }
    }

    await new Promise((r) => setTimeout(r, delaySeconds * 1000));
  }

  console.log("❌ Max attempts reached. Returning last response.");
  return lastResponse;
}