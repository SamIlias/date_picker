// import { fireEvent, render, screen } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
//
// import { ErrorFallback } from '@/components/ErrorFallback';
// import { darkTheme } from '@/theme/theme';
//
// import { ErrorBoundary } from '.';
//
// const ProblemChild = () => {
//   throw new Error('Test error');
// };
//
// describe('ErrorBoundary', () => {
//   it('renders children without errors', () => {
//     render(
//       <ThemeProvider theme={darkTheme}>
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <div>This is safe child</div>
//         </ErrorBoundary>
//       </ThemeProvider>,
//     );
//
//     expect(screen.getByText('This is safe child')).toBeInTheDocument();
//   });
//
//   it('renders FallbackComponent on error', () => {
//     render(
//       <ThemeProvider theme={darkTheme}>
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <ProblemChild />
//         </ErrorBoundary>
//       </ThemeProvider>,
//     );
//
//     expect(screen.getByText(/Test error/)).toBeInTheDocument();
//   });
//
//   it('passes resetBoundary through context', () => {
//     render(
//       <ThemeProvider theme={darkTheme}>
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <ProblemChild />
//         </ErrorBoundary>
//       </ThemeProvider>,
//     );
//
//     expect(screen.getByText(/Test error/)).toBeInTheDocument();
//     fireEvent.click(screen.getByText('Try again'));
//     expect(screen.queryByText(/Text error/)).toBeNull();
//   });
// });
