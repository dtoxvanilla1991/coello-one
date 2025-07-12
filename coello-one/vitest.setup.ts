import '@testing-library/jest-dom';
import { vi } from 'vitest';
import * as nextNavigation from 'next/navigation';

// Mock next/navigation notFound to throw so tests can catch it
vi.spyOn(nextNavigation, 'notFound').mockImplementation(() => {
  throw new Error('notFound');
});
